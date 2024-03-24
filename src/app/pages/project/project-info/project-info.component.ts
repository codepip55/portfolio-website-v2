import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
	selector: 'app-project-info',
	standalone: true,
	imports: [CommonModule, ImageUrlPipe, LoaderComponent],
	templateUrl: './project-info.component.html',
	styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
	) {}

	public project: any;
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;
		// @ts-ignore
		this.getProject(this.activatedRoute.snapshot.paramMap.get('id'));
		this.loading = false;
	}

	private async getProject(id: string): Promise<Subscription> {
		let project = this.strapiService.getProject(id);
		let projectSub = project.subscribe((b: any) => {
			this.project = b;

			this.seoService.generateTags(
				b.data.attributes.title,
				b.data.attributes.description,
				b.data.attributes.cover_image,
			);
		});
		return await projectSub;
	}
}

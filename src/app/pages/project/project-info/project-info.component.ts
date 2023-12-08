import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';

@Component({
	selector: 'app-project-info',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './project-info.component.html',
	styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
	) {}

	public project;

	ngOnInit(): void {
		// @ts-ignore
		this.getBlog(this.activatedRoute.snapshot.paramMap.get('id'));
		this.seoService.generateTags(
			this.project.data.attributes.title,
			this.project.data.attributes.description,
			this.project.data.attributes.cover_image,
		);
	}

	private async getProject(id: string) {
		let project = this.strapiService.getProject(id);
		// @ts-ignore
		project = await lastValueFrom(project);
		this.project = project;
		console.log(project);
	}
}

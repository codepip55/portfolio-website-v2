import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';

@Component({
	selector: 'app-blog-page',
	standalone: true,
	imports: [CommonModule, ImageUrlPipe],
	templateUrl: './blog-page.component.html',
	styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
	) {}

	public blog;

	ngOnInit(): void {
		// @ts-ignore
		this.getBlog(this.activatedRoute.snapshot.paramMap.get('id'));
		this.seoService.generateTags(
			this.blog.data.attributes.title,
			this.blog.data.attributes.description,
			this.blog.data.attributes.cover_image,
		);
	}

	private async getBlog(id: string) {
		let blog = this.strapiService.getBlog(id);
		let blogSub = blog.subscribe((b) => {
			this.blog = b;
			console.log(b);
		});
		console.log(this.blog);
	}
}

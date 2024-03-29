import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';
import { StripHtmlPipe } from 'src/app/pipes/strip-html.pipe';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SeoService } from '../../../services/seo.service';

@Component({
	selector: 'app-blog-dashboard',
	standalone: true,
	imports: [CommonModule, StripHtmlPipe, LoaderComponent],
	templateUrl: './blog-dashboard.component.html',
	styleUrl: './blog-dashboard.component.scss',
})
export class BlogDashboardComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private router: Router,
		private seoService: SeoService,
	) {}

	public blogPosts: any[] = [];
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;

		this.strapiService.getBlogs().subscribe((blogs: any) => {
			let unsortedBlogs = blogs.data;
			let sortedBlogs = unsortedBlogs.sort(
				(a, b) =>
					new Date(b.attributes.publishedAt).getTime() -
					new Date(a.attributes.publishedAt).getTime(),
			);
			this.blogPosts = sortedBlogs;
			console.log(sortedBlogs);
		});

		this.loading = false;

		this.seoService.generateTags(
			'Blog',
			'Read my blog posts.',
			'https://clickfirstmarketing.com/wp-content/uploads/Purpose-of-Blogging.jpeg',
		);
	}

	public navigateToBlog(id: string) {
		this.router.navigate(['/blog/' + id]);
	}
}

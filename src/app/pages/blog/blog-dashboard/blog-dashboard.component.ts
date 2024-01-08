import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';
import { StripHtmlPipe } from 'src/app/pipes/strip-html.pipe';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

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
	) {}

	public blogPosts: any = [];
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;

		this.strapiService.getBlogs().subscribe((b: any) => {
			this.blogPosts = b.data;
			console.log(b.data);
		});

		this.loading = false;
	}

	public navigateToBlog(id: string) {
		this.router.navigate(['/blog/' + id]);
	}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-blog-dashboard',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './blog-dashboard.component.html',
	styleUrl: './blog-dashboard.component.scss',
})
export class BlogDashboardComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private router: Router,
	) {}

	public blogPosts: any = [];

	ngOnInit(): void {
		this.strapiService.getBlogs().subscribe((b: any) => {
			this.blogPosts = b.data;
			console.log(b.data);
		});
	}

	public navigateToBlog(id: string) {
		this.router.navigate(['/blog/' + id]);
	}
}

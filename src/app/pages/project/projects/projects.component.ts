import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private router: Router,
		private seoService: SeoService,
	) {}

	public projects: any[] = [];
	public loading: boolean = false;

	ngOnInit(): void {
		this.loading = true;

		this.strapiService.getProjects().subscribe((projects: any) => {
			let unsortedProjects = projects.data;
			let sortedProjects = unsortedProjects.sort(
				(a, b) =>
					new Date(b.attributes.publishedAt).getTime() -
					new Date(a.attributes.publishedAt).getTime(),
			);
			this.projects = sortedProjects;
			console.log(sortedProjects);
		});

		this.loading = false;

		this.seoService.generateTags(
			'Projects',
			'View my projects.',
			'https://www.rc.virginia.edu/images/accord/project.png',
		);
	}

	public navigateToProject(id: string) {
		this.router.navigate(['/project/' + id]);
	}
}

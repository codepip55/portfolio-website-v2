import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { SeoService } from '../../services/seo.service';

@Component({
	selector: 'app-downloads',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './downloads.component.html',
	styleUrl: './downloads.component.scss',
})
export class DownloadsComponent implements OnInit {
	constructor(
		private strapiService: StrapiService,
		private seoService: SeoService,
	) {}

	public downloads: any[] = [];

	ngOnInit(): void {
		this.strapiService.getDownloads().subscribe((res: any) => {
			this.downloads = res.data;
			console.log(res.data);
		});

		this.seoService.generateTags(
			'Downloads',
			'Download some useful tools.',
			'https://www.flaxfields.co.uk/cms-files/5dce/5dcea80679aa2.jpg',
		);
	}
}

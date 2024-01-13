import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';

@Component({
	selector: 'app-downloads',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './downloads.component.html',
	styleUrl: './downloads.component.scss',
})
export class DownloadsComponent implements OnInit {
	constructor(private strapiService: StrapiService) {}

	public downloads: any[] = [];

	ngOnInit(): void {
		this.strapiService.getDownloads().subscribe((res: any) => {
			this.downloads = res.data;
			console.log(res.data);
		});
	}
}

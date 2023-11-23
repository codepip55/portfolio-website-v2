import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { StrapiService } from './services/strapi.service';
import { StorageService } from './services/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private strapiService: StrapiService, private storageService: StorageService) {}

	title = "Pepijn's Portfolio";

	loading: boolean = false;

	async ngOnInit(): Promise<void> {
		this.loading = true;

		if (new Date(window.localStorage.getItem('expiry')!) < new Date()) {
			this.storageService.removeItem('languageData');
			this.storageService.removeItem('expiry');
      this.storageService.removeItem('homeData')
		}

		if (
			this.storageService.getItem('homeData') &&
			this.storageService.getItem('languageData')
		) {
			this.loading = false;
			return;
		}

		let home = await firstValueFrom(this.strapiService.getHome());
		let languages = await firstValueFrom(this.strapiService.getLanguages());
		let expiry = new Date(new Date().getTime() + 60 * 60 * 24 * 3 * 1000); // 72 hours

		this.storageService.setItem('homeData', home);
		this.storageService.setItem('languageData', languages);
		this.storageService.setItem('expiry', expiry);

		this.loading = false;
	}
}

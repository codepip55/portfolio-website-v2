import { Component, OnInit } from '@angular/core';
import { StrapiService } from './services/strapi.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private strapiService: StrapiService,
  ) { }

  title = 'Pepijn\'s Portfolio';

  loading: boolean = false;

  async ngOnInit(): Promise<void> {
    this.loading = true;

    if (new Date(window.localStorage.getItem('expiry')!) < new Date()) {
      window.localStorage.removeItem('homeData')
      window.localStorage.removeItem('languageData')
      window.localStorage.removeItem('expiry')
    }

    if (window.localStorage.getItem('homeData') && window.localStorage.getItem('languageData')) {
      this.loading = false;
      return;
    }

    let home = await firstValueFrom(this.strapiService.getHome())
    let languages = await firstValueFrom(this.strapiService.getLanguages())
    let expiry = new Date(new Date().getTime() + (60 * 60 * 24 * 3 * 1000)) // 72 hours

    window.localStorage.setItem('homeData', JSON.stringify(home))
    window.localStorage.setItem('languageData', JSON.stringify(languages))
    window.localStorage.setItem('expiry', expiry.toString())

    this.loading = false;
  }
}

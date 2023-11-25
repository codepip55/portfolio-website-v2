import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  public generateTags(title: string, description: string, image: string) {
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'og:url', content: `https://staging.pepijncolenbrander.com${this.router.url}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
    ])
  }
}

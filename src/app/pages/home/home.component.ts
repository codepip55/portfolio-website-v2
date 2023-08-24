import { Component, OnInit } from '@angular/core';

import { HomeData } from 'src/app/models/homeData';
import { LanguageData } from 'src/app/models/languageData';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  homeData: HomeData;
  languageData: LanguageData[] = [];
  frontend: LanguageData[] = [];
  backend: LanguageData[] = [];
  database: LanguageData[] = [];

  language: string;
  description: string;
  projects: {
    id: number,
    title: string,
    link: string;
  }[] = [];

  async ngOnInit(): Promise<void> {
    let home = JSON.parse(window.localStorage.getItem('homeData')!)
    let languages = JSON.parse(window.localStorage.getItem('languageData')!)

    this.homeData = {
      title: home.data.attributes.display_name,
      description: home.data.attributes.job_title
    }

    languages.data.forEach((language: Record<any, any>) => {
      this.languageData.push({
        name: language['attributes'].Name,
        slug: language['attributes'].slug,
        description: language['attributes'].description,
        projects: language['attributes'].projects,
        type: language['attributes'].type
      })
    })

    this.frontend = this.languageData.filter((language) => language.type === 'frontend')
    this.backend = this.languageData.filter((language) => language.type === 'backend')
    this.database = this.languageData.filter((language) => language.type === 'database')
  }

  scrollToBottom(): void {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  async open(id: string, language: string) {
    const lang = this.languageData.map(e => e.name).indexOf(language)

    this.language = this.languageData[lang].name
    this.description = this.languageData[lang].description
    this.projects = this.languageData[lang].projects

    this.modalService.open(id);
  }

  openLink(link: string) {
    window.open(link)
  }

  preventDefault() {
    console.log('No Link found')
  }

}

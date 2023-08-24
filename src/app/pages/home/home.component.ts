import { Component, OnInit } from '@angular/core';
import { StrapiService } from 'src/app/services/strapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private strapiService: StrapiService
  ) { }

  loading: boolean = false;

  homeData: {
    name: String,
    title: String
  } = {
    name: '',
    title: ''
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const home = this.strapiService.getHome().subscribe((res) => {
      this.homeData = {
        // @ts-ignore
        name: res.data.attributes.display_name,
        // @ts-ignore
        title: res.data.attributes.job_title
      }
    })

    const languages = this.strapiService.getLanguages().subscribe((res) => {
      // @ts-ignore
      console.log(res['data'])
    })

    this.loading = false;
  }

  scrollToBottom(): void {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

}

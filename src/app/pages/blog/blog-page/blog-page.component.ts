import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from 'src/app/services/strapi.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit {

  constructor(private strapiService: StrapiService, private activatedRoute: ActivatedRoute) {}

  public blog;

  ngOnInit(): void {
    // @ts-ignore
    this.getBlog(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  private async getBlog(id: string) {
    let blog = this.strapiService.getBlogs(id)
    // @ts-ignore
    blog = await lastValueFrom(blog)
    this.blog = blog;
    console.log(blog)
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  windowScrolled = false;

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

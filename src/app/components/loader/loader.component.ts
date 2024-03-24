import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Input() width?: number;

  @HostBinding('class')
  get classes() {
    return `size-${this.size}`;
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-window',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './window.component.html',
	styleUrl: './window.component.scss',
})
export class WindowComponent {
	@Input() width: string = '770px';
	@Input() height: string = '500px';
}

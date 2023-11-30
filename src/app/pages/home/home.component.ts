import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from 'src/app/components/window/window.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, WindowComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {}

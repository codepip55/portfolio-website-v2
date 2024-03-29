import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { EventServiceTriggers } from '../../models/EventServiceTriggers';

@Component({
	selector: 'app-alerts',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './error.component.html',
	styleUrl: './error.component.scss',
})
export class ErrorComponent {
	alerts: any[] = [
		// { type: 'danger', message: 'This is an error alert' },
		// { type: 'warning', message: 'This is a warning alert' },
		// { type: 'success', message: 'This is a success alert' },
		// { type: 'info', message: 'This is an info alert' }
	];
	constructor(private eventsService: EventsService) {
		// Listen for events
		this.eventsService.on(
			EventServiceTriggers.NEW_ALERT,
			(type: string, message: string) => {
				this.addAlert(type, message);
			},
		);
	}

	// Add alert to array
	addAlert(type: string, message: string) {
		this.alerts.push({ type, message });
		// Close alert after 5 seconds
		this.closeAlert(this.alerts[this.alerts.length - 1]);
	}

	// Remove alert after 5 seconds
	closeAlert(alert: any) {
		setTimeout(() => {
			this.close(alert);
		}, 5000);
	}

	// Remove alert from array
	close(alert: any) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
		// Broadcast event
		this.eventsService.broadcast(EventServiceTriggers.DELETE_ALERT, alert);
	}
}

import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	listeners: any;
	eventsSubject: any;
	events;

	constructor() {
		this.listeners = {};
		this.eventsSubject = new Subject();

		this.events = from(this.eventsSubject);

		this.events.subscribe(({ name, args }) => {
			if (this.listeners[name]) {
				for (const listener of this.listeners[name]) {
					listener(...args);
				}
			}
		});
	}

	// Store events
	on(name: string, listener: any) {
		if (!this.listeners[name]) {
			this.listeners[name] = [];
		}
		this.listeners[name].push(listener);
		return listener;
	}

	// Fire events
	broadcast(name: string, ...args: any) {
		this.eventsSubject.next({
			name,
			args,
		});
	}

	unsubscribe(name: string, listenerToRemove: any) {
		if (!this.listeners[name]) {
			console.error(
				`Listener with the name ${name} is not an active listener and therefore could not be removed.`,
			);
			return false;
		}

		this.listeners[name].forEach((listener, index) => {
			if (listener === listenerToRemove) {
				this.listeners[name].splice(index, 1);
				return;
			}
		});
		return;
	}
}

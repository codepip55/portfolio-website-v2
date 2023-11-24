import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StrapiService {
	constructor(private http: HttpClient) {}

	private handleError<T>(err: any, res: T, action: string): Observable<T> {
		console.error(err);
		return of(res);
	}

	getHome() {
		return this.http
			.get(`https://cms.pepijncolenbrander.com/api/home?populate=*`)
			.pipe(
				catchError((err) => this.handleError(err, { user: null }, 'get name')),
			);
	}

	getLanguages() {
		return this.http
			.get(`https://cms.pepijncolenbrander.com/api/languages/?populate=*`)
			.pipe(
				catchError((err) =>
					this.handleError(err, { user: null }, 'get languages'),
				),
			);
	}
}

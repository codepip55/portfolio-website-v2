import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StrapiService {
	constructor(private http: HttpClient) {}

	private cmsUrl: string = 'http://localhost:1337/api';

	private handleError<T>(err: any, res: T, action: string): Observable<T> {
		console.error(err);
		return of(res);
	}

	getBlogs(id: string) {
		return this.http
			.get(`${this.cmsUrl}/blogs/${id}?populate=*`)
			.pipe(
				catchError((err) => this.handleError(err, { blog: null }, 'get blogs')),
			);
	}
}

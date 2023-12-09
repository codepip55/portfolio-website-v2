import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'imageUrl',
	standalone: true,
})
export class ImageUrlPipe implements PipeTransform {
	transform(value: string): string {
		const baseUrl = 'https://cms-staging.pepijncolenbrander.com';

		// Match img tags
		const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/g;

		// Match img tags within figure elements
		const figureImgRegex =
			/<figure[^>]*><img[^>]*src="([^"]*)"[^>]*><\/figure>/g;

		// Replace img tags
		const updatedHtml = value.replace(imgRegex, (match, src) => {
			const newSrc = `${baseUrl}${src}`;
			return match.replace(src, newSrc);
		});

		// Replace img tags within figure tags
		return updatedHtml.replace(figureImgRegex, (match, src) => {
			const newSrc = `${baseUrl}${src}`;
			return match.replace(src, newSrc);
		});
	}
}

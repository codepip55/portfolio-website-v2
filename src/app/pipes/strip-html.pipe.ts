import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'htmlStrip',
	pure: true, // Ensure pure is set to true for performance optimization
	standalone: true,
})
export class StripHtmlPipe implements PipeTransform {
	transform(value: string): string {
		// Create a temporary element and set its inner HTML to the provided value
		const tempElement = document.createElement('div');
		tempElement.innerHTML = value;

		// Return the text content of the temporary element, which doesn't include HTML tags
		return tempElement.textContent || tempElement.innerText || '';
	}
}

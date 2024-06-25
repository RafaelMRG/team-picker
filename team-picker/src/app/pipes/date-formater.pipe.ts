import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	      name: 'dateFormater', standalone: true
      })
export class DateFormaterPipe implements PipeTransform {

	transform(value: Date): string {

		const day = value.getDate().toString().padStart(2, '0');
		const month = value.toLocaleString('default', { month: 'short' });
		const year = value.getFullYear();
		const hours = value.getHours().toString().padStart(2, '0');
		const minutes = value.getMinutes().toString().padStart(2, '0');

		return `${ day } ${ month } ${ year } ${ hours }:${ minutes }`;
	}

}

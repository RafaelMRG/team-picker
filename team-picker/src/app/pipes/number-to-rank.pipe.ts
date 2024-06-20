import { Pipe, PipeTransform } from '@angular/core';
import { PLAYER_TIER } from "../services/player.types";

@Pipe({
	      name:       'numberToRank',
	      standalone: true
      })
export class NumberToRankPipe implements PipeTransform {

	transform(value: number | undefined): string {
		if ( value == undefined ) return '-';
		return PLAYER_TIER[Math.floor(value)];
	}

}

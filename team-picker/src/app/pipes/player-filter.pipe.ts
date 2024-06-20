import { Pipe, PipeTransform } from '@angular/core';
import { Player } from "../services/player.types";

@Pipe({
	      name:       'playerFilter',
	      standalone: true
      })
export class PlayerFilterPipe implements PipeTransform {

	transform(players: Player[] | undefined, searchStr: string): Player[] {
		if ( !players ) return [];
		if ( !searchStr ) return players;

		searchStr = searchStr.toLowerCase();

		return players.filter(player => player.nick.toLowerCase().includes(searchStr));
	}

}

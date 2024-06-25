import { inject, Injectable } from '@angular/core';
import { cloneDeep, remove } from "lodash";
import { Player, PLAYER_TIER } from "./player.types";
import { PlayerStateService } from "./player-state.service";
import { Shuffle } from "../components/modals/shuffle-history/shuffle-history.component";


@Injectable({
	            providedIn: 'root'
            })
export class RandomizerService {

	private readonly playerStateSvc = inject(PlayerStateService);


	randomize(teamOne: Player[], teamTwo: Player[]) {
		remove(teamOne);
		remove(teamTwo);
		const selectedPlayers = this.playerStateSvc.rngPlayerList();
		const groupedTiers = this.groupByTiers(selectedPlayers);
		this.shuffleWithinGroups(groupedTiers);
		const sortedPlayers = this.sortByTierDescending(groupedTiers);

		for ( let i = 0; i < sortedPlayers.length; i++ ) {
			if ( i % 2 === 0 ) {
				teamOne.push(sortedPlayers[i])
			} else {
				teamTwo.push(sortedPlayers[i])
			}
		}
		this.finalBalance(teamOne, teamTwo);
		const sortFn = (a: Player, b: Player) => a.tier - b.tier;
		teamOne.sort(sortFn)
		teamTwo.sort(sortFn);
		this.addToShuffleHistory(teamOne, teamTwo);
	}

	private groupByTiers(players: Player[]) {
		// @ts-expect-error Dictionary must be initialized empty
		const dict: Record<PLAYER_TIER, Player[]> = {};
		players.forEach(player => {
			dict[player.tier] ??= [];
			dict[player.tier].push(player);
		})
		return dict;
	}

	private shuffleWithinGroups(dict: Record<PLAYER_TIER, Player[]>) {
		for ( const dictKey in dict ) {
			if ( Object.prototype.hasOwnProperty.call(dict, dictKey) ) {
				const key = dictKey as unknown as PLAYER_TIER;
				this.shuffleArray(dict[key]);
			}
		}
	}

	private shuffleArray(originalArray: Player[]) {
		for ( let i = originalArray.length - 1; i > 0; i-- ) {
			const j = Math.floor(Math.random() * (i + 1));
			[ originalArray[i], originalArray[j] ] = [ originalArray[j], originalArray[i] ];
		}
	}

	private sortByTierDescending(tierDict: Record<PLAYER_TIER, Player[]>): Player[] {
		const sortedPlayers: Player[] = [];
		const sortedTiers = Object.keys(tierDict).map(Number).sort((a, b) => b - a);
		for ( const tier of sortedTiers ) {
			sortedPlayers.push(...tierDict[tier as unknown as PLAYER_TIER]);
		}
		return sortedPlayers;
	}

	private finalBalance(teamOne: Player[], teamTwo: Player[]) {
		let totalTierA = teamOne.reduce((sum, player) => sum + player.tier, 0);
		let totalTierB = teamTwo.reduce((sum, player) => sum + player.tier, 0);

		if ( Math.abs(totalTierA - totalTierB) > 1 ) {
			for ( let i = 0; i < teamOne.length; i++ ) {
				for ( let j = 0; j < teamTwo.length; j++ ) {
					const newTotalTierA = totalTierA - teamOne[i].tier + teamTwo[j].tier;
					const newTotalTierB = totalTierB - teamTwo[j].tier + teamOne[i].tier;
					if ( Math.abs(newTotalTierA - newTotalTierB) < Math.abs(totalTierA - totalTierB) ) {
						[ teamOne[i], teamTwo[j] ] = [ teamTwo[j], teamOne[i] ];
						totalTierA = newTotalTierA;
						totalTierB = newTotalTierB;
						if ( Math.abs(totalTierA - totalTierB) <= 1 ) {
							return;
						}
					}
				}
			}
		}
	}

	private addToShuffleHistory(teamOne: Player[], teamTwo: Player[]): void {
		const teamOneLeader = teamOne[0].nick ?? '1';
		const teamTwoLeader = teamTwo[0].nick ?? '2';

		const teamOneClone = cloneDeep(teamOne);
		const teamTwoClone = cloneDeep(teamTwo);

		const date = new Date();
		const shuffle: Shuffle = {
			date, teamOne: teamOneClone, teamTwo: teamTwoClone, teamOneLeader, teamTwoLeader
		}
		this.playerStateSvc.shuffleHistory.update(hist => [ shuffle, ...hist ])
	}

}




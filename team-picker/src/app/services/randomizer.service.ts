import {Injectable} from '@angular/core';
import _ from "lodash";
import {PlayerTierEnum} from "./player-tier.enum";

@Injectable({
    providedIn: 'root'
})
export class RandomizerService {


    randomize(allPlayers: Player[], teamOne: Player[], teamTwo: Player[]) {
        _.remove(teamOne);
        _.remove(teamTwo);
        const groupedTiers = this.groupByTiers(allPlayers);
        this.shuffleWithinGroups(groupedTiers);
        const sortedPlayers = this.sortByTierDescending(groupedTiers);

        for (let i = 0; i < sortedPlayers.length; i++) {
            if (i % 2 === 0) {
                teamOne.push(sortedPlayers[i])
            } else {
                teamTwo.push(sortedPlayers[i])
            }
        }
        this.finalBalance(teamOne, teamTwo);
    }

    private groupByTiers(players: Player[]) {
        // @ts-expect-error Dictionary must be initialized empty
        const dict: Record<PlayerTierEnum, Player[]> = {};
        players.forEach(player => {
            dict[player.tier] ??= [];
            dict[player.tier].push(player);
        })
        return dict;
    }

    private shuffleWithinGroups(dict: Record<PlayerTierEnum, Player[]>) {
        for (const dictKey in dict) {
            if (Object.prototype.hasOwnProperty.call(dict, dictKey)) {
                const key = dictKey as unknown as PlayerTierEnum;
                this.shuffleArray(dict[key]);
            }
        }
    }

    private shuffleArray(originalArray: Player[]) {
        for (let i = originalArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
        }
    }

    private sortByTierDescending(tierDict: Record<PlayerTierEnum, Player[]>): Player[] {
        const sortedPlayers: Player[] = [];
        const sortedTiers = Object.keys(tierDict).map(Number).sort((a, b) => b - a);
        for (const tier of sortedTiers) {
            sortedPlayers.push(...tierDict[tier as unknown as PlayerTierEnum]);
        }
        return sortedPlayers;
    }

    private finalBalance(teamOne: Player[], teamTwo: Player[]) {
        let totalTierA = teamOne.reduce((sum, player) => sum + player.tier, 0);
        let totalTierB = teamTwo.reduce((sum, player) => sum + player.tier, 0);

        if (Math.abs(totalTierA - totalTierB) > 1) {
            for (let i = 0; i < teamOne.length; i++) {
                for (let j = 0; j < teamTwo.length; j++) {
                    const newTotalTierA = totalTierA - teamOne[i].tier + teamTwo[j].tier;
                    const newTotalTierB = totalTierB - teamTwo[j].tier + teamOne[i].tier;
                    if (Math.abs(newTotalTierA - newTotalTierB) < Math.abs(totalTierA - totalTierB)) {
                        [teamOne[i], teamTwo[j]] = [teamTwo[j], teamOne[i]];
                        totalTierA = newTotalTierA;
                        totalTierB = newTotalTierB;
                        if (Math.abs(totalTierA - totalTierB) <= 1) {
                            return;
                        }
                    }
                }
            }
        }
    }

}

export interface Player {
    tier: PlayerTierEnum;
    nick: string;
}


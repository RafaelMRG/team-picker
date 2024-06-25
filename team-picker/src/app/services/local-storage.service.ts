import { effect, Injectable, WritableSignal } from '@angular/core';
import { Player } from "./player.types";
import { Shuffle } from "../components/modals/shuffle-history/shuffle-history.component";


@Injectable({
	            providedIn: 'root'
            })
export class LocalStorageService {
	private readonly LS_PREDEFINED_KEY = 'predefined_players';
	private readonly LS_HISTORY_KEY = 'shuffle_history';

	private playerHistory?: WritableSignal<Player[]>;

	public initializePlayerHistory(playerHistory: WritableSignal<Player[]>) {
		this.playerHistory = playerHistory;
		this.initializeHistory();
		this.addHistMutationEffect(); // TODO: Check if executing initialize before will
	                                // add side effect
	}

	public initializeShuffleHistory(shuffleHistory: WritableSignal<Shuffle[]>) {
		this.setupShuffleHistory(shuffleHistory);
		this.addShuffleHistMutationEffect(shuffleHistory);
	}

	private initializeHistory(): void {
		this.playerHistory?.set(this.readPlayersHistory());
	}

	private setupShuffleHistory(shuffleHistory: WritableSignal<Shuffle[]>) {
		shuffleHistory.set(this.readShuffleHistory());
	}

	private addHistMutationEffect() {
		effect(() => {
			const mutatedHistory = this.playerHistory?.();
			localStorage.setItem(this.LS_PREDEFINED_KEY, JSON.stringify(mutatedHistory));
		})
	}

	private addShuffleHistMutationEffect(shuffleHistory: WritableSignal<Shuffle[]>) {
		effect(() => {
			const mutatedHistory = shuffleHistory();
			localStorage.setItem(this.LS_HISTORY_KEY, JSON.stringify(mutatedHistory));
		})
	}

	public readShuffleHistory() {
		const lsData = localStorage.getItem(this.LS_HISTORY_KEY);
		if ( lsData === null ) {
			return [];
		}
		const parsed = JSON.parse(lsData) as Shuffle[]
		parsed.forEach(shuffle => {
			shuffle.date = new Date(shuffle.date);
		})
		return parsed;
	}

	public readPlayersHistory() {
		const lsData = localStorage.getItem(this.LS_PREDEFINED_KEY);
		if ( lsData === null ) {
			return [];
		}
		return JSON.parse(lsData) as Player[];
	}

}

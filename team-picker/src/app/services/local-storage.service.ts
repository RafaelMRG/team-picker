import { effect, Injectable, WritableSignal } from '@angular/core';
import { Player } from "./player.types";

@Injectable({
	            providedIn: 'root'
            })
export class LocalStorageService {
	private readonly LS_KEY = 'predefined_players';
	private isHistoryInitialized = false;

	private playerHistory?: WritableSignal<Player[]>;

	public initialize(playerHistory: WritableSignal<Player[]>) {
		this.playerHistory = playerHistory;
		this.initializeHistory();
		this.addHistMutationEffect(); // TODO: Check if executing initialize before will
	                                // add side effect
	}

	private initializeHistory(): void {
		this.playerHistory?.set(this.readStorage());
	}

	private addHistMutationEffect() {
		effect(() => {
			const mutatedHistory = this.playerHistory?.();
			localStorage.setItem(this.LS_KEY, JSON.stringify(mutatedHistory));
		})
	}

	public readStorage() {
		const lsData = localStorage.getItem(this.LS_KEY);
		if ( lsData === null ) {
			return [];
		}
		return JSON.parse(lsData) as Player[];
	}

}

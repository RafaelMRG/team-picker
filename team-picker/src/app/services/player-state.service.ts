import { effect, inject, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { Leaders, Player, PLAYER_TIER } from "./player.types";
import { LocalStorageService } from "./local-storage.service";
import { Shuffle } from "../components/modals/shuffle-history/shuffle-history.component";


@Injectable({
	            providedIn: 'root'
            })
export class PlayerStateService {

	// All modes
	readonly insertablePlayers = signal<Player[]>([])
	readonly playerHistory = signal<Player[]>([]);

	// Rng mode
	readonly rngPlayerList = signal<Player[]>([]);

	// Leaders mode
	readonly leaderPlayers = signal<Player[]>([]);
	readonly leaders = signal<Leaders>({ leaderA: null, leaderB: null });

	// Shuffle history
	readonly shuffleHistory = signal<Shuffle[]>([]);

	private readonly localStorageSvc = inject(LocalStorageService);

	constructor() {
		this.addInsertedPlayersEffect();
		this.localStorageSvc.initializePlayerHistory(this.playerHistory);
		this.localStorageSvc.initializeShuffleHistory(this.shuffleHistory);
		this.addNewPlayerEffect();
	}

	private addInsertedPlayersEffect() {
		effect(() => {
			const insertables = this.insertablePlayers();
			untracked(() => {
				this.insertIntoList(insertables, this.rngPlayerList);
				this.insertIntoList(insertables, this.leaderPlayers);
			})
		})
	}

	private insertIntoList(insertables: Player[], signal: WritableSignal<Player[]>) {
		signal.update(players => {

			const filteredInsertables = insertables.filter(insertable => {
				return !players.find(ply => ply === insertable)
			})
			return [ ...players, ...filteredInsertables ];
		})
	}

	public addNewPlayerEffect() {
		effect(() => {
			const addedPlayers = this.rngPlayerList();
			this.addNewPlayersToHistory(addedPlayers);
		})

		effect(() => {
			const addedPlayers = this.leaderPlayers();
			this.addNewPlayersToHistory(addedPlayers);
		})
	}

	private addNewPlayersToHistory(addedPlayers: Player[]) {
		untracked(() => {
			this.playerHistory.update(plyHist => {
				const newPlayers = addedPlayers.filter(addPlayer => {
					return !plyHist.includes(addPlayer);
				})
				return [ ...plyHist, ...newPlayers ]
			})
		})
	}

	public removePlayerFromHistory(player: Player): void {
		this.playerHistory.update(plyHist => plyHist.filter(ply => ply !== player))
	}

	public updatePlayerTier(player: Player, newTier: PLAYER_TIER) {
		player.tier = newTier;
		const fndIndex = this.playerHistory().findIndex(playerFromHist => playerFromHist === player)
		if ( fndIndex === -1 ) {
			this.playerHistory.set([ ...this.playerHistory(), player ])
		} else {
			this.playerHistory.set([ ...this.playerHistory() ])
		}
	}

	public rewriteHistory(players: Player[]) {
		untracked(() => {
			this.rngPlayerList.set([]);
			this.leaderPlayers.set([]);
		})
		this.playerHistory.set(players)
	}


}

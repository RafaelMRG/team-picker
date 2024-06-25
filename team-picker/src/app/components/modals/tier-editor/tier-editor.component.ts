import { Component, inject } from '@angular/core';
import {
	CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem
} from "@angular/cdk/drag-drop";
import { Player, PLAYER_TIER } from "../../../services/player.types";
import { JsonPipe, KeyValuePipe } from "@angular/common";
import { PlayerStateService } from "../../../services/player-state.service";
import {
	MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";


@Component({
	           selector:    'app-tier-editor',
	           standalone:  true,
	           imports:     [ DragDropModule, JsonPipe, KeyValuePipe, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose ],
	           templateUrl: './tier-editor.component.html',
	           styleUrl:    './tier-editor.component.scss'
           })
export class TierEditorComponent {
	constructor() {
		const tiers = Object.values(PLAYER_TIER);
		tiers.length = tiers.length / 2;
		this.tiers = tiers as (keyof typeof PLAYER_TIER)[];
		this.tiers.forEach(tier => this.byTiers[tier] = [])
		this.players.forEach(player => {
			const tier = PLAYER_TIER[player.tier];
			this.byTiers[tier].push(player)
		})
	}

	tiers: (keyof typeof PLAYER_TIER)[] = [];

	protected readonly playerStateSvc = inject(PlayerStateService);

	protected players = this.playerStateSvc.playerHistory();
	protected byTiers: Record<string, Player[]> = {}

	drop(event: CdkDragDrop<Player[]>, tier: string) {
		if ( event.previousContainer === event.container ) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,);
		}
		this.updatePlayerTier(event.item.data, tier);
	}

	updatePlayerTier(player: Player, tier: string) {
		this.playerStateSvc.updatePlayerTier(player, PLAYER_TIER[tier as keyof typeof PLAYER_TIER]);
	}


	protected readonly PLAYER_TIER = PLAYER_TIER;
}

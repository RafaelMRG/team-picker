import { Component, inject } from '@angular/core';
import { MatList, MatListItem } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { Player } from "../../../services/player.types";
import { PlayerStateService } from "../../../services/player-state.service";
import { DateFormaterPipe } from "../../../pipes/date-formater.pipe";
import {
	MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle
} from "@angular/material/dialog";
import { ShuffleInstanceComponent } from "./shuffle-instance/shuffle-instance.component";


@Component({
	           selector:    'app-shuffle-history',
	           standalone:  true,
	           imports:     [
		           MatList, MatListItem, MatIcon, MatMiniFabButton, MatDivider, DateFormaterPipe, MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle
	           ],
	           templateUrl: './shuffle-history.component.html',
	           styleUrl:    './shuffle-history.component.scss'
           })
export class ShuffleHistoryComponent {

	protected readonly playerStateSvc = inject(PlayerStateService);
	protected readonly dialog = inject(MatDialog);

	openHistoryInstance(shuffle: Shuffle) {
		this.dialog.open(ShuffleInstanceComponent, {
			width: '50vw', height: '80vh', data: shuffle, maxWidth: '90vw', maxHeight: '90vh'
		})
	}


}

export interface Shuffle {
	date: Date;
	teamOne: Player[];
	teamTwo: Player[];
	readonly teamOneLeader: string;
	readonly teamTwoLeader: string;
}

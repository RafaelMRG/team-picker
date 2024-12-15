import { Component, Inject } from '@angular/core';
import { MatList, MatListItem } from "@angular/material/list";
import {
	MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle
} from "@angular/material/dialog";
import { Shuffle } from "../shuffle-history.component";
import { NumberToRankPipe } from "../../../../pipes/number-to-rank.pipe";
import { MatButton } from "@angular/material/button";
import { DateFormaterPipe } from "../../../../pipes/date-formater.pipe";


@Component({
	           selector:    'app-shuffle-instance',
	           standalone:  true, imports: [
		MatList, MatListItem, NumberToRankPipe, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, MatDialogTitle, DateFormaterPipe
	],
	           templateUrl: './shuffle-instance.component.html',
	           styleUrl:    './shuffle-instance.component.scss'
           })
export class ShuffleInstanceComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: Shuffle) {}


}

import { Component, inject, ViewChild } from '@angular/core';
import { MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatList, MatListItem } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatDivider } from "@angular/material/divider";
import { DecimalPipe, JsonPipe, NgTemplateOutlet } from "@angular/common";
import { ANIM_SLIDE_IN } from "../../material/animations";
import { NotificationService } from "../../services/notification.service";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { RandomizerService } from "../../services/randomizer.service";
import { Player, PLAYER_TIER, PLAYER_TIERS_STR } from "../../services/player.types";
import { PlayerStateService } from "../../services/player-state.service";
import { NumberToRankPipe } from "../../pipes/number-to-rank.pipe";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { before } from "lodash";


@Component({
	           selector:    'app-randomized-picker',
	           standalone:  true,
	           imports:     [
		           MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatList, MatListItem, MatIcon, MatMiniFabButton, MatHint, MatButton, MatTooltip, MatDivider, NgTemplateOutlet, MatMenuTrigger, MatMenu, MatMenuItem, JsonPipe, DecimalPipe, NumberToRankPipe, MatAutocompleteTrigger, MatAutocomplete, MatOption
	           ],
	           templateUrl: './randomized-picker.component.html',
	           styleUrl:    './randomized-picker.component.scss',
	           animations:  [
		           ANIM_SLIDE_IN
	           ]
           })
export class RandomizedPickerComponent {

	private readonly notificationService = inject(NotificationService);
	private readonly randomizerService = inject(RandomizerService);
	protected readonly playerStateSvc = inject(PlayerStateService);
	private readonly clipboard = inject(Clipboard);

	teamOne: Player[] = [];
	teamTwo: Player[] = [];
	tierAvgs: { teamOneAvg?: number; teamTwoAvg?: number } = {
		teamOneAvg: undefined, teamTwoAvg: undefined,

	}
	protected readonly PLAYER_TIERS_STR = PLAYER_TIERS_STR;
	protected readonly PLAYER_TIER = PLAYER_TIER;

	removePlayerFromList(player: Player) {
		this.playerStateSvc.rngPlayerList.update(plys => plys.filter(p => p !== player))
	}

	addPlayerToList(event: Event, player: string, input: HTMLInputElement): void {
		event.preventDefault();
		const newPlayer = { nick: player, tier: PLAYER_TIER.S };
		this.processPlayerUpdate(player, newPlayer);
		input.value = '';
	}


	private processPlayerUpdate(player: string, newPlayer: Player) {

		const pTrim = player.trim();
		const playerList = this.playerStateSvc.rngPlayerList
		const playerExists = !!playerList().find(plr => plr.nick === pTrim);
		if ( playerExists ) {
			this.notificationService.error('Nickname já existe, escreva outro!')
		} else if ( pTrim === '' ) {
			this.notificationService.error('Nickname está vazio, escrava corretamente!')
		} else {
			const playerHistory = this.playerStateSvc.playerHistory()
			const playerFromHist = playerHistory.find(hist => hist.nick === newPlayer.nick);
			newPlayer = playerFromHist ?? newPlayer;
			playerList.update(curr => [ ...curr, newPlayer ])
		}
	}

	randomize() {
		this.randomizerService.randomize(this.teamOne, this.teamTwo);
		this.setAvgTier()
		this.clipboardTeam();
	}

	private clipboardTeam() {
		const teamOneJoin = `Time 1: \n >${ this.teamOne.map(ply => ply.nick).join('\n >') }\n\n`
		const teamTwoJoin = `Time 2: \n >${ this.teamTwo.map(ply => ply.nick).join('\n >') }`
		const success = this.clipboard.copy(teamOneJoin + teamTwoJoin);
		if ( success ) {
			this.notificationService.normal('Time randomizado e copiado!')
		} else {
			this.notificationService.error('Falha ao copiar time para o clipboard!')
		}
	}

	clearPlayerList() {
		this.playerStateSvc.rngPlayerList.set([])
	}

	updatePlayerTier(player: Player, tier: string) {
		this.playerStateSvc.updatePlayerTier(player, PLAYER_TIER[tier as keyof typeof PLAYER_TIER]);
	}

	setAvgTier() {
		const sumCallback = (previousValue: number,
		                     currentValue: Player) => previousValue + currentValue.tier.valueOf()
		const teamOneSum = this.teamOne.reduce<number>(sumCallback, 0);
		const teamTwoSum = this.teamTwo.reduce<number>(sumCallback, 0);

		this.tierAvgs.teamOneAvg = teamOneSum / this.teamOne.length;
		this.tierAvgs.teamTwoAvg = teamTwoSum / this.teamTwo.length;
	}

	@ViewChild(MatAutocompleteTrigger) autocompleteTrigger?: MatAutocompleteTrigger;

	protected closeAutocompleteInput() {
		this.autocompleteTrigger?.closePanel();
	}

	protected readonly before = before;
}







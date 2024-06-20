import {
	Component,
	inject,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatList, MatListItem } from "@angular/material/list";
import { ANIM_SLIDE_IN } from "../../../material/animations";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { NotificationService } from "../../../services/notification.service";
import { remove } from "lodash";
import { JsonPipe } from "@angular/common";
import { PlayerStateService } from "../../../services/player-state.service";
import { Player, PLAYER_TIER } from "../../../services/player.types";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { PlayerFilterPipe } from "../../../pipes/player-filter.pipe";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Clipboard } from "@angular/cdk/clipboard";
import {
	MatBottomSheet,
	MatBottomSheetConfig,
	MatBottomSheetRef
} from "@angular/material/bottom-sheet";

@Component({
	           selector:    'app-pre-defined-players',
	           standalone:  true,
	           imports:     [ MatDialogModule, MatButtonModule, MatList, MatListItem, MatIcon, MatTooltip, MatCheckbox, JsonPipe, MatFormField, MatInput, FormsModule, PlayerFilterPipe, MatLabel, MatMenuTrigger, MatMenu, MatMenuItem ],
	           templateUrl: './pre-defined-players.component.html',
	           styleUrl:    './pre-defined-players.component.scss',
	           animations:  [ ANIM_SLIDE_IN ]
           })
export class PreDefinedPlayersComponent {
	protected readonly playerStateSvc = inject(PlayerStateService);
	protected readonly notificationService = inject(NotificationService);
	protected playersToInsert: Player[] = [];
	protected readonly clipboard = inject(Clipboard)
	protected readonly bottomSheet = inject(MatBottomSheet);


	checkPlayer(event: MatCheckboxChange, player: Player) {
		if ( event.checked ) {
			this.playersToInsert.push(player);
		} else {
			remove(this.playersToInsert, ply => ply === player)
		}
	}

	submitToInsert() {
		this.playerStateSvc
			.insertablePlayers
			.set([ ...this.playersToInsert ])
	}

	removePlayer(player: Player) {
		this.playerStateSvc.removePlayerFromHistory(player);
	}

	copyHistoryCode() {
		const history = this.playerStateSvc.playerHistory();
		const stringyfied = JSON.stringify(history);
		const b64 = btoa(stringyfied);
		const copySuccess = this.clipboard.copy(b64);

		if ( copySuccess ) {
			this.notificationService.normal('Código copiado!')
		} else {
			this.notificationService.error('Erro ao tentar copiar!')
		}
	}

	@ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

	selectAllPlayersToInsert() {

		this.checkboxes.forEach(checkbox => {
			checkbox.checked = true;
			const event = new MatCheckboxChange();
			event.source = checkbox;
			event.checked = checkbox.checked;
			checkbox.change.emit(event)
		});
	}


	// Code load bottom sheet
	@ViewChild('importer') template?: TemplateRef<never>;

	private codeLoader?: MatBottomSheetRef<unknown, never>;

	protected openCodeLoader(config?: MatBottomSheetConfig) {
		if ( !this.template ) return;
		this.codeLoader = this.bottomSheet.open(this.template, config);
	}

	protected importHistoryCode(base64String: string) {
		try {
			const players: Player[] = JSON.parse(atob(base64String));
			this.playerStateSvc.rewriteHistory(players);
			this.notificationService.normal(
				'Código carregado!',
				undefined)
			this.codeLoader?.dismiss();
		} catch ( e ) {
			console.error(e);
			this.notificationService.error('Código inválido, tente novamente!')
		}
	}


	protected filterStr = '';

	protected readonly PLAYER_TIER = PLAYER_TIER;
}

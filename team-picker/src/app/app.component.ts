import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from "./material/material.module";
import { MatTooltip } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { PreDefinedPlayersComponent } from "./components/modals/pre-defined-players/pre-defined-players.component";
import { TierEditorComponent } from "./components/modals/tier-editor/tier-editor.component";
import { ShuffleHistoryComponent } from "./components/modals/shuffle-history/shuffle-history.component";
import { MatIconRegistry } from "@angular/material/icon";


@Component({
	           selector:    'app-root',
	           standalone:  true,
	           imports:     [ RouterOutlet, MaterialModule, MatTooltip ],
	           templateUrl: './app.component.html',
	           styleUrl:    './app.component.scss'
           })
export class AppComponent implements OnInit {

	ngOnInit() {
		this.matIconReg.setDefaultFontSetClass('material-symbols-rounded');
	}

	private readonly dialog = inject(MatDialog);
	private readonly matIconReg = inject(MatIconRegistry);

	openPlayerManager() {
		this.dialog.open(PreDefinedPlayersComponent, { minWidth: '40vw' })
	}

	openTierEditor() {
		this.dialog.open(TierEditorComponent, {
			minWidth: '95vw', minHeight: '95vh', maxWidth: '95vw', maxHeight: '95vh'
		})
	}

	openShuffleHistory() {
		this.dialog.open(ShuffleHistoryComponent, {
			minWidth: '95vw', minHeight: '95vh', maxWidth: '95vw', maxHeight: '95vh'
		})
	}

	title = 'team-picker';
}

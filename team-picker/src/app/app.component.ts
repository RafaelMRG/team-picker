import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { MatTooltip } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { PreDefinedPlayersComponent } from "./components/modals/pre-defined-players/pre-defined-players.component";
import { TierEditorComponent } from "./components/modals/tier-editor/tier-editor.component";
import { ShuffleHistoryComponent } from "./components/modals/shuffle-history/shuffle-history.component";


@Component({
	           selector:    'app-root',
	           standalone:  true,
	           imports:     [ RouterOutlet, NgOptimizedImage, MaterialModule, RouterLink, RouterLinkActive, MatTooltip ],
	           templateUrl: './app.component.html',
	           styleUrl:    './app.component.scss'
           })
export class AppComponent {
	private readonly dialog = inject(MatDialog);

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

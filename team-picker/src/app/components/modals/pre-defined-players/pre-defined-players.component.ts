import {Component, inject, OnInit} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {PreDefinedManagerService} from "../../../services/pre-defined-manager.service";
import {Player} from "../../../services/randomizer.service";
import {MatList, MatListItem} from "@angular/material/list";
import {ANIM_SLIDE_IN} from "../../../material/animations";
import {MatIcon} from "@angular/material/icon";
import {PLAYER_TIERS_STR, PlayerTierEnum} from "../../../services/player-tier.enum";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {NotificationService} from "../../../services/notification.service";
import {remove} from "lodash";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-pre-defined-players',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatList, MatListItem, MatIcon, MatTooltip, MatCheckbox, JsonPipe],
    templateUrl: './pre-defined-players.component.html',
    styleUrl: './pre-defined-players.component.scss',
    animations: [ANIM_SLIDE_IN]
})
export class PreDefinedPlayersComponent implements OnInit {
    protected readonly manager = inject(PreDefinedManagerService);
    protected preDefinedPlayers?: Player[];
    protected readonly notificationService = inject(NotificationService);
    protected playersToInsert: Player[] = [];


    ngOnInit() {
        this.preDefinedPlayers = this.manager.readStorage(true);
    }

    checkPlayer(event: MatCheckboxChange, player: Player) {
        if (event.checked) {
            this.playersToInsert.push(player);
        } else {
            remove(this.playersToInsert, ply => ply === player)
        }
    }

    submitToInsert() {
        this.manager.insertEvent.set([...this.playersToInsert]);
    }

    removePlayer(player: Player) {
        const indexPre = this.preDefinedPlayers?.findIndex(ply => ply.nick === player.nick)
        const indexToIns = this.preDefinedPlayers?.findIndex(ply => ply.nick === player.nick)
        if (indexPre == undefined || indexPre < 0) return;
        this.preDefinedPlayers?.splice(indexPre, 1);
        if (indexToIns && indexToIns > -1) {
            this.playersToInsert.splice(indexToIns, 1);
        }
        this.manager.removePlayerFromStorage(player);
    }

    protected readonly PLAYER_TIER = PlayerTierEnum;
    protected readonly PLAYER_TIERS_STR = PLAYER_TIERS_STR;
}

import {Component, inject} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import _ from "lodash";
import {JsonPipe, NgTemplateOutlet} from "@angular/common";
import {ANIM_SLIDE_IN} from "../../material/animations";
import {NotificationService} from "../../services/notification.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Player, RandomizerService} from "../../services/randomizer.service";
import {PlayerTierEnum} from "../../services/player-tier.enum";

@Component({
    selector: 'app-randomized-picker',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatList,
        MatListItem,
        MatIcon,
        MatMiniFabButton,
        MatHint,
        MatButton,
        MatTooltip,
        MatDivider,
        NgTemplateOutlet,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        JsonPipe
    ],
    templateUrl: './randomized-picker.component.html',
    styleUrl: './randomized-picker.component.scss',
    animations: [
        ANIM_SLIDE_IN
    ]
})
export class RandomizedPickerComponent {

    private readonly notificationService = inject(NotificationService);
    private readonly randomizerService = inject(RandomizerService);

    playerList: Player[] = [];
    teamOne: Player[] = [];
    teamTwo: Player[] = [];
    readonly PLAYER_TIERS_STR = Object.keys(PlayerTierEnum).filter(key => !isNaN(Number(PlayerTierEnum[key as keyof typeof PlayerTierEnum])));

    removePlayerFromList(index: number) {
        this.playerList.splice(index, 1);
    }

    addPlayerToList(event: Event, player: string, input: HTMLInputElement): void {
        event.preventDefault();
        const playerExists = !!this.playerList.find(plr => plr.nick === player)
        if (playerExists) {
            this.notificationService.error('Nickname já existe, escreva outro!')
        } else if (player.trim() === '') {
            this.notificationService.error('Nickname está vazio, escrava corretamente!')
        } else {
            this.playerList.push({nick: player, tier: PlayerTierEnum.S});
        }
        input.value = '';
    }

    randomize() {
        this.randomizerService.randomize(this.playerList, this.teamOne, this.teamTwo);
    }

    clearPlayerList() {
        _.remove(this.playerList);
    }

    updatePlayerTier(player: Player, tier: string) {
        player.tier = PlayerTierEnum[tier as keyof typeof PlayerTierEnum];
        this.notificationService.normal(`Jogador ${player.nick} mudado para o tier ${tier}`)
    }


    protected readonly PLAYER_TIER = PlayerTierEnum;
}







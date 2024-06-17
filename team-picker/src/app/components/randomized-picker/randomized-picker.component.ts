import {Component, effect, inject} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {JsonPipe, NgTemplateOutlet} from "@angular/common";
import {ANIM_SLIDE_IN} from "../../material/animations";
import {NotificationService} from "../../services/notification.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Player, RandomizerService} from "../../services/randomizer.service";
import {PLAYER_TIERS_STR, PlayerTierEnum} from "../../services/player-tier.enum";
import {remove} from "lodash";
import {PreDefinedManagerService} from "../../services/pre-defined-manager.service";

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

    constructor() {
        effect(() => {
            this.manager.insertEvent().forEach(ply => {
                this.processPlayerUpdate(ply.nick, ply);
            })
        })
    }

    private readonly notificationService = inject(NotificationService);
    private readonly randomizerService = inject(RandomizerService);
    private readonly manager = inject(PreDefinedManagerService);

    playerList: Player[] = [];
    teamOne: Player[] = [];
    teamTwo: Player[] = [];
    readonly PLAYER_TIERS_STR = PLAYER_TIERS_STR;

    removePlayerFromList(index: number) {
        this.playerList.splice(index, 1);
    }

    addPlayerToList(event: Event, player: string, input: HTMLInputElement): void {
        event.preventDefault();
        const newPlayer = {nick: player, tier: PlayerTierEnum.S};
        this.processPlayerUpdate(player, newPlayer);
        input.value = '';
        this.manager.addPlayerToStorage(newPlayer);
    }


    private processPlayerUpdate(player: string, newPlayer: Player) {
        const playerExists = !!this.playerList.find(plr => plr.nick === player);
        if (playerExists) {
            this.notificationService.error('Nickname já existe, escreva outro!')
        } else if (player.trim() === '') {
            this.notificationService.error('Nickname está vazio, escrava corretamente!')
        } else {
            this.playerList.push(newPlayer);
        }
    }

    randomize() {
        this.randomizerService.randomize(this.playerList, this.teamOne, this.teamTwo);
    }

    clearPlayerList() {
        remove(this.playerList);
    }

    updatePlayerTier(player: Player, tier: string) {
        player.tier = PlayerTierEnum[tier as keyof typeof PlayerTierEnum];
        this.notificationService.normal(`Jogador ${player.nick} mudado para o tier ${tier}`)
        this.manager.addPlayerToStorage(player);
    }


    protected readonly PLAYER_TIER = PlayerTierEnum;
}







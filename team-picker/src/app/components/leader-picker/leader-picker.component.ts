import {Component, effect, inject, signal, untracked} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {JsonPipe, NgIf} from "@angular/common";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ANIM_CHECKMARK, ANIM_SLIDE_IN} from "../../material/animations";
import {PreDefinedManagerService} from "../../services/pre-defined-manager.service";
import {PlayerTierEnum} from "../../services/player-tier.enum";

@Component({
    selector: 'app-leader-picker',
    standalone: true,
    imports: [
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIcon,
        MatInput,
        MatButton,
        JsonPipe,
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatChipRemove,
        MatSelect,
        MatOption,
        MatList,
        MatListItem,
        MatDivider,
        NgIf
    ],
    templateUrl: './leader-picker.component.html',
    styleUrl: './leader-picker.component.scss',
    animations: [ANIM_SLIDE_IN, ANIM_CHECKMARK]
})
export class LeaderPickerComponent {

    protected readonly manager = inject(PreDefinedManagerService);

    constructor() {
        this.manager.insertEvent.set([]);
        effect(() => {
            const playersSource = this.manager.insertEvent();
            untracked(() => {
                const players: string[] = playersSource.map(ply => ply.nick);
                this.players.set(players);
                this.availablePlayers.setValue(this.players());
                this.availablePlayers.markAllAsTouched();
            })
        });
    }

    // First step
    firstStepFg = new FormGroup({
        firstLeader: new FormControl<string>('', [Validators.required]),
        secondLeader: new FormControl<string>('', [Validators.required]),
    })

    // Second step
    readonly players = signal<string[]>([]);
    secondStepFg = new FormGroup({
        availablePlayers: new FormControl<string[]>([],
            [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    })


    removePlayer(player: string) {
        this.players.update(players => {
            const index = players.indexOf(player);
            if (index < 0) {
                return players;
            }

            players.splice(index, 1);
            return [...players];
        });
        this.availablePlayers.setValue(this.players());
    }

    addPlayer(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value && this.players().indexOf(value) === -1) {
            this.players.update(players => [...players, value]);
        }

        event.chipInput!.clear();
        this.availablePlayers.setValue(this.players());
        this.availablePlayers.markAllAsTouched();
        this.manager.addPlayerToStorage({nick: value, tier: PlayerTierEnum['S']}, true)
    }


    // Third step
    thirdStepFg = new FormGroup({
        firstTeam: new FormControl<string[]>([], [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
        secondTeam: new FormControl<string[]>([], [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    })

    get firstTeam() {
        return this.thirdStepFg.get('firstTeam');
    }

    get secondTeam() {
        return this.thirdStepFg.get('secondTeam');
    }

    addTeamMember(change: MatSelectChange, team: number): void {
        change.source.close();
        if (team === 1) {
            this.firstTeam?.value?.push(change.value);
            this.firstTeam?.updateValueAndValidity()
        }
        if (team === 2) {
            this.secondTeam?.value?.push(change.value);
            this.secondTeam?.updateValueAndValidity()
        }
        change.source.value = null;
        this.setNextPicker();
        // this.thirdStepFg.updateValueAndValidity();
    }

    playerAlreadyPicked(player: string) {
        const indexFirst = this.firstTeam?.value?.indexOf(player) ?? -1
        const indexSecond = this.secondTeam?.value?.indexOf(player) ?? -1
        return indexFirst > -1 || indexSecond > -1;
    }

    public currentPicker: 1 | 2 = 1;
    public nextPicker: 1 | 2 = 2;

    setNextPicker() {

        if (this.currentPicker === 1 && this.nextPicker === 2) {
            this.nextPicker = 2;
            this.currentPicker = 2;
            return;
        }

        if (this.currentPicker === 2 && this.nextPicker === 2) {
            this.nextPicker = 1;
            return;
        }

        if (this.currentPicker === 2 && this.nextPicker === 1) {
            this.currentPicker = 1;
            this.nextPicker = 1;
            return;
        }

        if (this.currentPicker === 1 && this.nextPicker === 1) {
            this.nextPicker = 2;
            return;
        }
    }

    get disableFirstLeader() {
        return this.currentPicker === 2;
    }

    get disableSecondLeader() {
        return this.currentPicker === 1;
    }

    // Last step
    readonly clipboard = inject(Clipboard);
    readonly snackbar = inject(MatSnackBar)

    copiedSuccessfully = false;

    copyTeam() {
        this.copiedSuccessfully = false;
        const success = this.clipboard.copy(this.generateTeamText())
        if (success) {
            this.snackbar.open('Copiado copiado com sucesso!', undefined, {duration: 2500});
            this.copiedSuccessfully = true;
        } else {
            this.snackbar.open('Erro ao copiar!', undefined, {duration: 2500})
            this.copiedSuccessfully = false;
        }
    }

    private generateTeamText() {
        const leader1 = `Time ${this.firstLeader.value}\n `
        const team1 = this.firstTeam?.value?.join('\n')
        const leader2 = `\n\nTime ${this.secondLeader.value}\n `
        const team2 = this.secondTeam?.value?.join('\n');
        return leader1 + team1 + leader2 + team2;
    }

    // Getters
    get firstLeader() {
        return this.firstStepFg.get('firstLeader') as FormControl<string>;
    }

    get secondLeader() {
        return this.firstStepFg.get('secondLeader') as FormControl<string>;
    }

    get availablePlayers() {
        return this.secondStepFg.get('availablePlayers') as FormControl<string[]>;
    }
}


import {inject, Injectable, signal} from '@angular/core';
import {NotificationService} from "./notification.service";
import {Player} from "./randomizer.service";

@Injectable({
    providedIn: 'root'
})
export class PreDefinedManagerService {
    // TODO: Add local storage management through signals
    readonly LS_KEY = 'predefined_players';
    private readonly notificationService = inject(NotificationService);
    readonly insertEvent = signal<Player[]>([]);

    public readStorage(showMessage?: boolean) {
        const lsData = localStorage.getItem(this.LS_KEY);
        if (lsData === null) {
            if (showMessage) this.notificationService.normal('Você não possui usuários salvos no seu browser, uma lista é automaticamente gerada ao inserir jogadores pela primeira vez', 6000);
            return;
        }
        return JSON.parse(lsData) as Player[];
    }

    public addPlayerToStorage(player: Player, isUntiered?: boolean) {
        let players = this.readStorage();
        players ??= [];
        const existingPlayerIndex = players.findIndex(ply => ply.nick === player.nick);
        if (existingPlayerIndex !== -1) {
            if (isUntiered) {
                players[existingPlayerIndex].nick = player.nick;
            } else {
                players[existingPlayerIndex] = player;
            }
        } else {
            players.push(player);
        }
        localStorage.setItem(this.LS_KEY, JSON.stringify(players));
        return players;
    }

    public removePlayerFromStorage(player: Player) {
        const storageData = this.readStorage();
        if (storageData) {
            const index = storageData.findIndex(ply => ply.nick === player.nick);
            storageData.splice(index, 1);
            localStorage.setItem(this.LS_KEY, JSON.stringify(storageData));
        }
    }

}

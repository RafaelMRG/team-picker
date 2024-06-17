import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {MaterialModule} from "./material/material.module";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage, MaterialModule, RouterLink, RouterLinkActive],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'team-picker';
}

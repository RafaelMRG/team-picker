import { Component } from '@angular/core';
import { MaterialModule } from "../../material/material.module";
import { RandomizedPickerComponent } from "../randomized-picker/randomized-picker.component";
import { LeaderPickerComponent } from "../leader-picker/leader-picker.component";
import { ANIM_CMP_TRANSITION } from "../../material/animations";

@Component({
	           selector:    'app-mode-chooser',
	           standalone:  true,
	           imports:     [ MaterialModule, RandomizedPickerComponent, LeaderPickerComponent ],
	           templateUrl: './mode-chooser.component.html',
	           styleUrl:    './mode-chooser.component.scss',
	           animations:  [ ANIM_CMP_TRANSITION ]
           })
export class ModeChooserComponent {
	currentMode: 'random' | 'leader' | undefined = undefined;
}

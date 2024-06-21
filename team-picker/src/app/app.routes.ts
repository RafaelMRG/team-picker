import { Routes } from '@angular/router';
import { ModeChooserComponent } from "./components/mode-chooser/mode-chooser.component";

export const routes: Routes = [
	{
		path: 'escolher', component: ModeChooserComponent
	},
	{
		path: '**', redirectTo: 'escolher',
	}
];

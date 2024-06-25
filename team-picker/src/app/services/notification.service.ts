import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";


@Injectable({
	            providedIn: 'root'
            })
export class NotificationService {

	private readonly snackbar: MatSnackBar = inject(MatSnackBar);

	public error(message: string, duration?: number) {

		this.snackbar.open(message, 'Fechar', {
			duration: duration ?? 3500, panelClass: 'error-snackbar'
		})

	}

	public normal(message: string, duration?: number, extraConfig?: MatSnackBarConfig<never>) {
		this.snackbar.open(message, 'Fechar', {
			duration: duration ?? 3500, ...extraConfig
		})
	}

}

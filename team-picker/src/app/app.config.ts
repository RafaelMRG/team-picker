import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withHashLocation()),
		provideAnimationsAsync(),
		{
			provide:  MAT_TOOLTIP_DEFAULT_OPTIONS,
			useValue: {
				disableTooltipInteractivity: true,
			},
		},
	]
};

import { Component, Input, signal } from '@angular/core';
import { ANIM_COUNTER_ROLL } from "../../../material/animations";


@Component({
	           selector:    'app-animated-counter',
	           standalone:  true,
	           imports:     [],
	           templateUrl: './animated-counter.component.html',
	           styleUrl:    './animated-counter.component.scss',
	           animations:  [ ANIM_COUNTER_ROLL ]
           })
export class AnimatedCounterComponent {


	protected state = signal('increased');
	previousCount = 0;

	protected readonly _count = signal(0);

	@Input() set count(value: number) {
		this.previousCount = value
		this._count.set(value);
	}

	get count() {
		return this._count();
	}

}

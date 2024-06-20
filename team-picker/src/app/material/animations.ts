import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const ANIM_SLIDE_IN =
	trigger('listAnimation', [
		transition('* => *', [
			query(':enter', [
				style({ opacity: 0, transform: 'translateY(-30px)', height: '0px' }),
				stagger(30, [
					animate('0.08s', style({ opacity: 1, transform: 'translateY(0)', height: '*' }))
				])
			], { optional: true }),
			query(':leave', [
				animate(
					'0.15s',
					style({ opacity: 0, transform: 'translateY(-30px)', height: '0px' }))
			], { optional: true })
		])
	])

export const ANIM_CHECKMARK = trigger('checkAnimation', [
	transition(':enter', [
		style({ transform: 'scale(0)', opacity: 0 }),
		animate('0.1s ease-out', style({ transform: 'scale(1.6)', opacity: 1 })),
		animate('0.2s ease-out', style({ transform: 'scale(1)' }))
	])
])

export const ANIM_CMP_TRANSITION = trigger('componentAnimation', [
	transition(':enter', [
		style({
			      opacity:   0,
			      transform: 'translateX(-100%)',
			      position:  'absolute',
			      width:     '100%'
		      }),
		animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
	]),
	transition(':leave', [
		style({ position: 'absolute', width: '100%' }),
		animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
	])
])

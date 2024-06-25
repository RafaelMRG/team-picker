import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefinedPlayersComponent } from './pre-defined-players.component';


describe('PreDefinedPlayersComponent', () => {
	let component: PreDefinedPlayersComponent;
	let fixture: ComponentFixture<PreDefinedPlayersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			                                     imports: [ PreDefinedPlayersComponent ]
		                                     })
		             .compileComponents();

		fixture = TestBed.createComponent(PreDefinedPlayersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderPickerComponent } from './leader-picker.component';


describe('LeaderPickerComponent', () => {
	let component: LeaderPickerComponent;
	let fixture: ComponentFixture<LeaderPickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			                                     imports: [ LeaderPickerComponent ]
		                                     })
		             .compileComponents();

		fixture = TestBed.createComponent(LeaderPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

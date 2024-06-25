import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeChooserComponent } from './mode-chooser.component';


describe('ModeChooserComponent', () => {
	let component: ModeChooserComponent;
	let fixture: ComponentFixture<ModeChooserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			                                     imports: [ ModeChooserComponent ]
		                                     })
		             .compileComponents();

		fixture = TestBed.createComponent(ModeChooserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

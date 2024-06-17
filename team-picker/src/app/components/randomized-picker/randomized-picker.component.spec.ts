import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizedPickerComponent } from './randomized-picker.component';

describe('RandomizedPickerComponent', () => {
  let component: RandomizedPickerComponent;
  let fixture: ComponentFixture<RandomizedPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomizedPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomizedPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

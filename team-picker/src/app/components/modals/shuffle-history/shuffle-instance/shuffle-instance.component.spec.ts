import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleInstanceComponent } from './shuffle-instance.component';

describe('ShuffleInstanceComponent', () => {
  let component: ShuffleInstanceComponent;
  let fixture: ComponentFixture<ShuffleInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuffleInstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuffleInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

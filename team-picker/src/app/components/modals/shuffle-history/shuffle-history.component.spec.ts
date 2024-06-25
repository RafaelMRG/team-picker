import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleHistoryComponent } from './shuffle-history.component';

describe('ShuffleHistoryComponent', () => {
  let component: ShuffleHistoryComponent;
  let fixture: ComponentFixture<ShuffleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuffleHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuffleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

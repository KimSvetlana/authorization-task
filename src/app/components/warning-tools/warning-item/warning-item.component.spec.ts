import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningItemComponent } from './warning-item.component';

describe('WarningItemComponent', () => {
  let component: WarningItemComponent;
  let fixture: ComponentFixture<WarningItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningItemComponent]
    });
    fixture = TestBed.createComponent(WarningItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

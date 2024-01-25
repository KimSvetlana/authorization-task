import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningToolsComponent } from './warning-tools.component';

describe('WarningToolsComponent', () => {
  let component: WarningToolsComponent;
  let fixture: ComponentFixture<WarningToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningToolsComponent]
    });
    fixture = TestBed.createComponent(WarningToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

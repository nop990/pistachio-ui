import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayedColumnsComponent } from './displayed-columns.component';

describe('DisplayedColumnsComponent', () => {
  let component: DisplayedColumnsComponent;
  let fixture: ComponentFixture<DisplayedColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayedColumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayedColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

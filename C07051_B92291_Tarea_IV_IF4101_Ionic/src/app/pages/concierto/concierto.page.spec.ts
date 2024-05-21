import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConciertoPage } from './concierto.page';

describe('ConciertoPage', () => {
  let component: ConciertoPage;
  let fixture: ComponentFixture<ConciertoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciertoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

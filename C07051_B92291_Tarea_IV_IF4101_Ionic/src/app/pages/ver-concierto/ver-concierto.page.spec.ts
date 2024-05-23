import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerConciertoPage } from './ver-concierto.page';

describe('VerConciertoPage', () => {
  let component: VerConciertoPage;
  let fixture: ComponentFixture<VerConciertoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConciertoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

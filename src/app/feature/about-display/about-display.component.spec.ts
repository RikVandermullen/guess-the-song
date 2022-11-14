import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDisplayComponent } from './about-display.component';

describe('AboutDisplayComponent', () => {
  let component: AboutDisplayComponent;
  let fixture: ComponentFixture<AboutDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

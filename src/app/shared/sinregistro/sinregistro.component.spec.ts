import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinregistroComponent } from './sinregistro.component';

describe('SinregistroComponent', () => {
  let component: SinregistroComponent;
  let fixture: ComponentFixture<SinregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

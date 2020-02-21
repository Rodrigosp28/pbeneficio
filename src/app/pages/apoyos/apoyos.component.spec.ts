import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyosComponent } from './apoyos.component';

describe('ApoyosComponent', () => {
  let component: ApoyosComponent;
  let fixture: ComponentFixture<ApoyosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoyosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoyosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

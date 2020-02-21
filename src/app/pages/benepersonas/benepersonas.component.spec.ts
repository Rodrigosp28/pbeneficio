import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenepersonasComponent } from './benepersonas.component';

describe('BenepersonasComponent', () => {
  let component: BenepersonasComponent;
  let fixture: ComponentFixture<BenepersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenepersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenepersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

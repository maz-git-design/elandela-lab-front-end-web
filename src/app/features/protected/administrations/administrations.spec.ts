import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Administrations } from './administrations';

describe('Administrations', () => {
  let component: Administrations;
  let fixture: ComponentFixture<Administrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Administrations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Administrations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

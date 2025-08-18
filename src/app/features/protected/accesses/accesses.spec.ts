import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accesses } from './accesses';

describe('Accesses', () => {
  let component: Accesses;
  let fixture: ComponentFixture<Accesses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accesses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accesses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

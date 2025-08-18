import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cohorts } from './cohorts';

describe('Cohorts', () => {
  let component: Cohorts;
  let fixture: ComponentFixture<Cohorts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cohorts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cohorts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRegistration } from './face-registration';

describe('FaceRegistration', () => {
  let component: FaceRegistration;
  let fixture: ComponentFixture<FaceRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

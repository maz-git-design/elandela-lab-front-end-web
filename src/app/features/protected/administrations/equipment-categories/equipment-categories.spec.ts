import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCategories } from './equipment-categories';

describe('EquipmentCategories', () => {
  let component: EquipmentCategories;
  let fixture: ComponentFixture<EquipmentCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

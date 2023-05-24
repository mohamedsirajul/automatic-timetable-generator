import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedTableComponent } from './created-table.component';

describe('CreatedTableComponent', () => {
  let component: CreatedTableComponent;
  let fixture: ComponentFixture<CreatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

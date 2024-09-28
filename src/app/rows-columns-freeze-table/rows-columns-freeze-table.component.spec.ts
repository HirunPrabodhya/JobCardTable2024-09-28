import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowsColumnsFreezeTableComponent } from './rows-columns-freeze-table.component';

describe('RowsColumnsFreezeTableComponent', () => {
  let component: RowsColumnsFreezeTableComponent;
  let fixture: ComponentFixture<RowsColumnsFreezeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowsColumnsFreezeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowsColumnsFreezeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

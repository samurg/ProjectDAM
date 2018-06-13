import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInvestmentComponent } from './item-investment.component';

describe('ItemInvestmentComponent', () => {
  let component: ItemInvestmentComponent;
  let fixture: ComponentFixture<ItemInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprojectDetailComponent } from './myproject-detail.component';

describe('MyprojectDetailComponent', () => {
  let component: MyprojectDetailComponent;
  let fixture: ComponentFixture<MyprojectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprojectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprojectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrendingComponent } from './list-trending.component';

describe('ListTrendingComponent', () => {
  let component: ListTrendingComponent;
  let fixture: ComponentFixture<ListTrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecentComponent } from './list-recent.component';

describe('ListLatestComponent', () => {
  let component: ListRecentComponent;
  let fixture: ComponentFixture<ListRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFiveArticlesComponent } from './list-five-articles.component';

describe('ListFiveArticlesComponent', () => {
  let component: ListFiveArticlesComponent;
  let fixture: ComponentFixture<ListFiveArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFiveArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFiveArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

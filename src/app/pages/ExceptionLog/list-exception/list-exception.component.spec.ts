import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExceptionComponent } from './list-exception.component';

describe('ListExceptionComponent', () => {
  let component: ListExceptionComponent;
  let fixture: ComponentFixture<ListExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

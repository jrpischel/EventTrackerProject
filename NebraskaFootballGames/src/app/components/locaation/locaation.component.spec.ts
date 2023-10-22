import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaationComponent } from './locaation.component';

describe('LocaationComponent', () => {
  let component: LocaationComponent;
  let fixture: ComponentFixture<LocaationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocaationComponent]
    });
    fixture = TestBed.createComponent(LocaationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

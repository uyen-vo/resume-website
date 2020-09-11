import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevItemComponent } from './dev-item.component';

describe('DevItemComponent', () => {
  let component: DevItemComponent;
  let fixture: ComponentFixture<DevItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

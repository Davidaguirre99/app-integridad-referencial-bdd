import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBdComponent } from './detalle-bd.component';

describe('DetalleBdComponent', () => {
  let component: DetalleBdComponent;
  let fixture: ComponentFixture<DetalleBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

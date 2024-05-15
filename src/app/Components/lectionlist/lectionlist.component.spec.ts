import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectionlistComponent } from './lectionlist.component';

describe('LectionlistComponent', () => {
  let component: LectionlistComponent;
  let fixture: ComponentFixture<LectionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectionlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

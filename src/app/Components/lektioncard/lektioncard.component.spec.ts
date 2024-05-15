import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektioncardComponent } from './lektioncard.component';

describe('LektioncardComponent', () => {
  let component: LektioncardComponent;
  let fixture: ComponentFixture<LektioncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektioncardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

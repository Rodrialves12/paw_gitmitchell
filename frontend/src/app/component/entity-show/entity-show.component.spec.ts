import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityShowComponent } from './entity-show.component';

describe('EntityShowComponent', () => {
  let component: EntityShowComponent;
  let fixture: ComponentFixture<EntityShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

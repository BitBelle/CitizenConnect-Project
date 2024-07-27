import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovdashboardComponent } from './govdashboard.component';

describe('GovdashboardComponent', () => {
  let component: GovdashboardComponent;
  let fixture: ComponentFixture<GovdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

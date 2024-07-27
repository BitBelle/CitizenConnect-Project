import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedIncidentsComponent } from './reported-incidents.component';

describe('ReportedIncidentsComponent', () => {
  let component: ReportedIncidentsComponent;
  let fixture: ComponentFixture<ReportedIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

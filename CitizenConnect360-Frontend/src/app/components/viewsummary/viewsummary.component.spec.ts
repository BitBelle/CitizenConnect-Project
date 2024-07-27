import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsummaryComponent } from './viewsummary.component';

describe('ViewsummaryComponent', () => {
  let component: ViewsummaryComponent;
  let fixture: ComponentFixture<ViewsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

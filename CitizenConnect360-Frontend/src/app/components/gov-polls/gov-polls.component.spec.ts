import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovPollsComponent } from './gov-polls.component';

describe('GovPollsComponent', () => {
  let component: GovPollsComponent;
  let fixture: ComponentFixture<GovPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovPollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovNavbarComponent } from './gov-navbar.component';

describe('GovNavbarComponent', () => {
  let component: GovNavbarComponent;
  let fixture: ComponentFixture<GovNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

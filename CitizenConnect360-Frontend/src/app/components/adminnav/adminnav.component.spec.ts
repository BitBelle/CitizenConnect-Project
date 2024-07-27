import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adminnavComponent } from './adminnav.component';

describe('adminnavComponent', () => {
  let component: adminnavComponent;
  let fixture: ComponentFixture<adminnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [adminnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(adminnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

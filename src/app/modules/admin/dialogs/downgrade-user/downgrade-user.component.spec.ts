import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowngradeUserComponent } from './downgrade-user.component';

describe('DowngradeUserComponent', () => {
  let component: DowngradeUserComponent;
  let fixture: ComponentFixture<DowngradeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DowngradeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DowngradeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

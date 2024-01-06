import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminProjectComponent } from './view-admin-project.component';

describe('ViewAdminProjectComponent', () => {
  let component: ViewAdminProjectComponent;
  let fixture: ComponentFixture<ViewAdminProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdminProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAdminProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

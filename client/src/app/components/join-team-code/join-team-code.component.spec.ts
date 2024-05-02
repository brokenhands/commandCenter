import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamCodeComponent } from './join-team-code.component';

describe('JoinTeamCodeComponent', () => {
  let component: JoinTeamCodeComponent;
  let fixture: ComponentFixture<JoinTeamCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTeamCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinTeamCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

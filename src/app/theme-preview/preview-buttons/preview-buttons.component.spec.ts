import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewButtonsComponent } from './preview-buttons.component';

describe('PreviewButtonsComponent', () => {
  let component: PreviewButtonsComponent;
  let fixture: ComponentFixture<PreviewButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTabsComponent } from './preview-tabs.component';

describe('PreviewTabsComponent', () => {
  let component: PreviewTabsComponent;
  let fixture: ComponentFixture<PreviewTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

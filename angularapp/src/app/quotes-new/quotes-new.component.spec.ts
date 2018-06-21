import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesNewComponent } from './quotes-new.component';

describe('QuotesNewComponent', () => {
  let component: QuotesNewComponent;
  let fixture: ComponentFixture<QuotesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

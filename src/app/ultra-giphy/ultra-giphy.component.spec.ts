import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltraGiphyComponent } from './ultra-giphy.component';

describe('UltraGiphyComponent', () => {
  let component: UltraGiphyComponent;
  let fixture: ComponentFixture<UltraGiphyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltraGiphyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltraGiphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

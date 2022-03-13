import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyGridComponent } from './giphy-grid.component';

describe('GiphyGridComponent', () => {
  let component: GiphyGridComponent;
  let fixture: ComponentFixture<GiphyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddNewComponent } from './movie-add-new.component';

describe('MovieAddNewComponent', () => {
  let component: MovieAddNewComponent;
  let fixture: ComponentFixture<MovieAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

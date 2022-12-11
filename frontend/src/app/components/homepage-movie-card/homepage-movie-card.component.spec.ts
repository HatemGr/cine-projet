import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMovieCardComponent } from './homepage-movie-card.component';

describe('HomepageMovieCardComponent', () => {
  let component: HomepageMovieCardComponent;
  let fixture: ComponentFixture<HomepageMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageMovieCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

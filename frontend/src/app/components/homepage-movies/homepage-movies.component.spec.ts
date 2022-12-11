import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMoviesComponent } from './homepage-movies.component';

describe('HomepageMoviesComponent', () => {
  let component: HomepageMoviesComponent;
  let fixture: ComponentFixture<HomepageMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

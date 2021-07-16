import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { SynopsisDetailsComponent } from '../synopsis-details/synopsis-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // holds movie list from api
  movies: any[] = [];
  // holds user favorites list from api
  favorites: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) { }

  // runs functions on page initiation
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  // retrieves movies from api and sets movies array
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }
  
  // retrieves user profile from api and sets favorites array
  getFavorites(): void {
    this.fetchApiData.getProfile().subscribe((response: any) => {
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

  /**
   * checks if title exists in favorites array
   * @param {string} movieTitle
   * @returns {boolean}
   */
  checkFavorite(movieTitle: string): boolean {
    return this.favorites.some( favorite => favorite.Title === movieTitle)
  }
  
  /**
   * opens director-detail dialog
   * @param {string} name 
   * @param {string} bio 
   */
  openDirectorDetailDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDetailsComponent, {
      width: 'max-content',
      data: { directorName: name, directorBio: bio }
    });
  }
  
  /**
   * opens-genre-detail dialog
   * @param {string} name 
   * @param {string} description 
   */
  openGenreDetailDialog(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      width: 'max-content',
      data: { genreName: name, genreDescription: description }
    });
  }
  
  /**
   * opens synopsis-detail dialog
   * @param {string} title 
   * @param {string} synopsis 
   */
  openSynopsisDetailDialog(title: string, synopsis: string): void {
    this.dialog.open(SynopsisDetailsComponent, {
      width: 'max-content',
      data: { movieTitle: title, movieSynopsis: synopsis }
    });
  }

  /**
   * sends movie ID to API to be added to user favorites
   * calls getFavorites to update favorites array
   * @param {string} movieId 
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((response: any) => {
      this.getFavorites();
    });
  }

  /**
   * sends movie ID to API to be removed from user favorites
   * calls getFavorites to update favorites array
   * @param {string} movieId 
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavorite(movieId).subscribe((response: any) => {
      this.getFavorites();
    });
  }

}

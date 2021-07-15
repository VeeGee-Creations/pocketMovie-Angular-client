import { Component, Input, OnInit } from '@angular/core';
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
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }
  

  getFavorites(): void {
    this.fetchApiData.getProfile().subscribe((response: any) => {
      this.favorites = response.Favorites;
      return this.favorites;
    });
  }

  checkFavorite(movie: string): boolean {
    return this.favorites.some( favorite => favorite.Title === movie)
  }
  
  openDirectorDetailDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDetailsComponent, {
      width: 'max-content',
      data: { directorName: name, directorBio: bio }
    });
  }
  
  openGenreDetailDialog(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      width: 'max-content',
      data: { genreName: name, genreDescription: description }
    });
  }
  
  openSynopsisDetailDialog(title: string, synopsis: string): void {
    this.dialog.open(SynopsisDetailsComponent, {
      width: 'max-content',
      data: { movieTitle: title, movieSynopsis: synopsis }
    });
  }

  addFavorite(movie: string): void {
    this.fetchApiData.addFavorite(movie).subscribe((response: any) => {
      this.getFavorites();
    });
  }

  removeFavorite(movie: string): void {
    this.fetchApiData.removeFavorite(movie).subscribe((response: any) => {
      this.getFavorites();
    });
  }

}

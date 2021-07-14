import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that wil provide data for the client app
const apiURL = 'https://pocket-movies.herokuapp.com';
const token = localStorage.getItem('token');
const authHeaders = {headers: new HttpHeaders(
  {
    Authorization: `Bearer ${token}`
  }
)}

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiURL}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // making the api call for the user login endpoint
  public userLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${apiURL}/login`, {}, {params:{
      Username: username,
      Password: password
    }}).pipe(
      catchError(this.handleError)
    );
  }

  // making the api call for the movies endpoint
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiURL}/movies`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovieTitle(movieTitle: string): Observable<any> {
    return this.http.get(`${apiURL}/movies/${movieTitle}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the directors endpoint
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${apiURL}/directors/${directorName}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the genres endpoint
  public getGenres(): Observable<any> {
    return this.http.get(`${apiURL}/genres`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the users profile endpoint
  public getProfile(): Observable<any> {
    return this.http.get(`${apiURL}/users/profile`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the favorites push endpoint
  public addFavorite(movieTitle: string): Observable<any> {
    return this.http.post(`${apiURL}/users/favorites/push/${movieTitle}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the favorites pull endpoint
  public removeFavorite(movieTitle: string): Observable<any> {
    return this.http.post(`${apiURL}/users/favorites/pull/${movieTitle}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the edit profile endpoint
  public editProfile(userDetails: any): Observable<any> {
    return this.http.put(`${apiURL}/users/`, authHeaders, userDetails).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // making the api call for the delete profile endpoint
  public deleteProfile(userDetails: any): Observable<any> {
    return this.http.delete(`${apiURL}/users/`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body: ${error.error}`
      );
    }
    return throwError(
      'Something went wrong; Please try again later'
    );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}
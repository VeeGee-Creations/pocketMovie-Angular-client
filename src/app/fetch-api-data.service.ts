import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * base API URL
 * @constant
 * @type {string}
 * @default
 */
const apiURL = 'https://pocket-movies.herokuapp.com';

// reference user authorization token from local storage
const token = localStorage.getItem('token');

// authorization header for API calls
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
  
  /**
   * makes post call to API users endpoint
   * @param {object} userDetails 
   * @returns API response
   */
  public userRegistration(userDetails: object): Observable<any> {
    return this.http.post(`${apiURL}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * makes post call to API login endpoint
   * @param {string} username
   * @param {string} password
   * @returns API response
   */
  public userLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${apiURL}/login`, {}, {params:{
      Username: username,
      Password: password
    }}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * makes get call to API movies endpoint
   * @returns all movies
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiURL}/movies`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes get call to API movies endpoint
   * @param {string} movieTitle 
   * @returns single movie
   */
  public getMovieTitle(movieTitle: string): Observable<any> {
    return this.http.get(`${apiURL}/movies/${movieTitle}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes get call to API directors endpoint
   * @param {string} directorName 
   * @returns single director
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${apiURL}/directors/${directorName}`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes get call to API genres endpoint
   * @returns all genres
   */
  public getGenres(): Observable<any> {
    return this.http.get(`${apiURL}/genres`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes get call to API users/profile endpoint
   * @returns user information
   */
  public getProfile(): Observable<any> {
    return this.http.get(`${apiURL}/users/profile`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes post call to users/favorites/push endpoint
   * adds movie by ID to users favorites list
   * @param {string} movieId 
   * @returns user information
   */
  public addFavorite(movieId: string): Observable<any> {
    return this.http.post(`${apiURL}/users/favorites/push/${movieId}`, {}, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes post call to users/favorites/pull endpoint
   * removes movie by ID from users favorites list
   * @param {string} movieId 
   * @returns user information
   */
  public removeFavorite(movieId: string): Observable<any> {
    return this.http.post(`${apiURL}/users/favorites/pull/${movieId}`, {}, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes put call to API users endpoint
   * @param {object} userDetails 
   * @returns user information
   */
  public editProfile(userDetails: object): Observable<any> {
    return this.http.put(`${apiURL}/users/`, userDetails, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * makes delete call to API users endpoint
   * @param {object} userDetails 
   * @returns API response
   */
  public deleteProfile(userDetails: object): Observable<any> {
    return this.http.delete(`${apiURL}/users/`, authHeaders).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * handles http errors
   * @param {httpErrorResponse} error 
   * @returns  error message
   */
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

  /**
   * extracts response body
   * @param {Response} res 
   * @returns {object} response body
   */
  private extractResponseData(res: Response): object {
    const body = res;
    return body || {};
  }
}
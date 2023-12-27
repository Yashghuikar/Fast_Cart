import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/';
  headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json',
  });

  getDataFromServer(endPoint: any) {
    const url = this.baseUrl + endPoint;
    return this.http.get(url);
  }
  postDataFromServer(endPoint: string, body: any) {
    const url = this.baseUrl + endPoint;
    return this.http.post(url, body, { headers: this.headers });
  }
}

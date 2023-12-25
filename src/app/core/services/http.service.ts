import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/';

  getDataFromServer(endPoint: any) {
    const url = this.baseUrl + endPoint;
    return this.http.get(url);
  }
}

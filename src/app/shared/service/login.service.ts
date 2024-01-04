import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  addUser(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUser() {
    let user = localStorage.getItem('userInfo');
    if (user) {
      const userInfo = JSON.parse(user);
      return userInfo;
    }
  }
}

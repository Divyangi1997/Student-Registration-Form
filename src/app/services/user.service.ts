import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    name: '',
    rollno: null,
    username: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(private _httpClient: HttpClient) { }

  register(user: User){
    return this._httpClient.post(environment.apiBaseUrl+ '/register',user, this.noAuthHeader);
  }

  login(user: User){
    return this._httpClient.post(environment.apiBaseUrl+ '/login',user, this.noAuthHeader);
  }

  getUserProfile(){
    return this._httpClient.get(environment.apiBaseUrl + '/profile');
  }

  setToken(token:string) {
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}

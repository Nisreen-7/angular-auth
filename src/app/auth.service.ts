import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './entities';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<User>(environment.serverUrl+'/api/user', user)

  }
}

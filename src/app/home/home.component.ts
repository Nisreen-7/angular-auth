import { Component, OnInit } from '@angular/core';
import { User } from '../entities';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(public authService:AuthService){}

  checkIfLogged() {
    this.authService.getUser().subscribe(data => console.log(data));
  }

}

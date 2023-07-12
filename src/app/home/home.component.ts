import { Component, OnInit } from '@angular/core';
import { User } from '../entities';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: User[] = [];

  constructor(private service: AuthService) { }

  ngOnInit(): void {
   }

}

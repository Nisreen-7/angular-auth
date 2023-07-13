import { Component, OnInit } from '@angular/core';
import { User } from '../entities';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit  {
  list:User[] = []
  displayedColumns = ['id', 'email', 'password', 'role'];
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => this.list = data);
  }

}

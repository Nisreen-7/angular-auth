import { Component, Input } from '@angular/core';
import { User } from '../entities';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = { email: '', password: '' };
repeat='';
  constructor(private authservice: AuthService) { }
  isLogin=true;
  feedback = '';

  onSubmit() {
    if (!this.isLogin) {
      this.authservice.addUser(this.user)
      .subscribe(() => this.feedback = 'registration complete.');
    }

    this.authservice.login(this.user)
      .subscribe(() => this.feedback = 'Login complete .');


  }



}

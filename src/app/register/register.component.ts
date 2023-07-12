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
  repeat = '';
  constructor(private authservice: AuthService) { }
  isLogin = true;
  feedback = '';

  onSubmit() {
    if (!this.isLogin) {
      this.authservice.addUser(this.user)
        .subscribe({
          complete: () => this.feedback = 'registration complete.',
          error: () => this.feedback = 'User already exists'
        });
    } else {

    }
    this.authservice.login(this.user)
      .subscribe({
        complete: () => this.feedback = 'Login successful',
        error: () => this.feedback = 'credential errore'
      });
  }


}


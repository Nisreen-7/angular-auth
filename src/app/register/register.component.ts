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
  constructor(private authservice: AuthService) { }
  feedback = '';
  onSubmit() {
    this.authservice.addUser(this.user)
      .subscribe(() => this.feedback = 'registration complete.');
  }


}

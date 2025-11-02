import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: 'admin' | 'user' = 'user';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.loginAs(this.selectedRole);
    this.router.navigate(['/forms']);
}
}

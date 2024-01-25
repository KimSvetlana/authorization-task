import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss'],
})
export class AuthorizationFormComponent {
  hide: boolean = true;
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.myForm = new FormGroup({
      userLogin: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userCheckbox: new FormControl(false),
    });
  }

  async submit() {
    const formValue = this.myForm.getRawValue();
    const login = formValue.userLogin;
    const password = formValue.userPassword;
    this.authService.login(login, password)
    .subscribe((status: boolean) => {
      if (status) {
        // Authentication successful
        this.router.navigate(['/dashboard']);
      } else {
        // Handle authentication failure
      }
    });

  }
}

import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
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
  isAuthErr: boolean = false;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.authForm = new FormGroup({
      userLogin: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userCheckbox: new FormControl(false),
    });
  }

  async submit() {
    const formValue = this.authForm.getRawValue();
    const login = formValue.userLogin;
    const password = formValue.userPassword;

    if(formValue.userCheckbox) localStorage.setItem(login, password);

    this.authService.login(login, password)
    .subscribe((status: boolean) => {
      if (status) {
        // Authentication successful
        this.router.navigate(['/dashboard']);
      } else {
          this.isAuthErr = true;
      }
    });
  }

  onLoginInputBlur() {
    const formValue = this.authForm.getRawValue();
    const login = formValue.userLogin;
    if(login){
      let password = localStorage.getItem(login);
      if(password) this.authForm.patchValue({userPassword: password});
      else  this.authForm.patchValue({userPassword: ''});
    }
    else this.authForm.patchValue({userPassword: ''});
  }

  inputChange(){
    if(this.isAuthErr) this.isAuthErr = !this.isAuthErr;
    this.onLoginInputBlur()
  }
}

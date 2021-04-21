import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup
  message: string

  constructor(private formBuilder: FormBuilder,
    private authService: authService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmitLogin() {
    const email = this.signinForm.get('email').value
    const password = this.signinForm.get('password').value

    this.authService.login(email, password)
  }
}

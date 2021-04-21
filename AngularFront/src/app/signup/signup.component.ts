
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  message: string
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: authService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }
  onSubmit() {
    const email = this.signupForm.get('email').value
    const password = this.signupForm.get('password').value


    this.authService.register(email, password)

  }
}

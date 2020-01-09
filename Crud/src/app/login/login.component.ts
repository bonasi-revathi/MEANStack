import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Incorrect: boolean;


  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  async onSubmit(form) {
    console.log(form.value);
    let loginres: any;
    loginres = await this.registerService.loginUser(form.value);
    console.log(loginres);
    if (loginres.status == 200) {
      localStorage.setItem('user', JSON.stringify(loginres.data));
      localStorage.setItem('authtoken', loginres.authtoken );
      this.registerService.logincount = true;
      this.router.navigate(['/home']);
    } else if (loginres.status ==  404) {
      this.router.navigate(['/add-user']);
    } else if (loginres.status == 402){
        this.Incorrect = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {RegisterService} from '../register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  states = [ 'A.p', 'Telangana', 'Tamilnadu', 'Karnataka'];
  registerForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder,private router: Router,private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({

      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:[ '', Validators.required],
      state:['', Validators.required]
    });
  }
get f() {
  return this.registerForm.controls;
}
  async onRegister(P) {
  this.submitted = true;
  if (this.registerForm.valid) {
        console.log('rfvaluees',this.registerForm.value);
        const status: any = await this.registerService.createUser(this.registerForm.value);
        console.log(status);
        if (status) {
          localStorage.setItem('user',JSON.stringify(status.data));
          this.registerService.logincount = false;
          this.router.navigate(['/home']);
        }
      } else {
        console.log('form is invalid');
        return;

      }

    }

}

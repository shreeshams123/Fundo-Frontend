import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ) ]],
    });
  }
  
  get loginControls() { return this.loginForm.controls }

  handleLogin() {
    const {status = "", value } = this.loginForm
    console.log(this.loginForm.controls);
    this.submitted = true
    if(status == "INVALID") 
      return
    console.log(this.loginForm);
    console.log(this.loginForm.controls);
    //api calling
    
  }
}

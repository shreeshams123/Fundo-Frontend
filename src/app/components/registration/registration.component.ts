import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm!:FormGroup;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern('^\\d{10}')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ) ]],
        confirm: ['', [Validators.required,Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ) ]]
    },{
      validator: MustMatch('password', 'confirm')
  });
  }
  get signupControls() {return this.signupForm.controls}

  handleSignup() {
    const {status = "", value } = this.signupForm
    console.log(this.signupForm.controls);
    this.submitted = true
    if(status == "INVALID") return
    console.log(this.signupForm);
    console.log(this.signupForm.controls);
    //api calling
    
  }

}

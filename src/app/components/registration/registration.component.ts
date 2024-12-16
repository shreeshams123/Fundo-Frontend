import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm!:FormGroup;
  submitted:boolean=false;
  errorMessage:string='';
  successMessage:string='';
  constructor(private formBuilder:FormBuilder,private userservice:UserService,private router:Router){}
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern('^\\d{10}')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ) ]],
        confirmPassword: ['', [Validators.required]]
    },{
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get signupControls() {return this.signupForm.controls}

  handleSignup() {
    const {status = "", value } = this.signupForm
    const{name,email,phone,password,confirmPassword}=value
    console.log(this.signupForm.controls);
    this.submitted = true
    if(status == "INVALID") 
      return
    console.log(this.signupForm);
    console.log(this.signupForm.controls);
    this.userservice.registerApiCall({name,email,phone,password,confirmPassword}).subscribe({next:(res)=>
      {
        console.log(res)
        this.successMessage="Registration successful";
        setTimeout(()=>{
          this.router.navigate(["/"]);
        },2000);
      },
      error: (err) => {
        console.log(err);
        if(err.error?.message){
        this.errorMessage=err.error.message
        }
        else{
          this.errorMessage="Unexpected error occured";        
        }
        setTimeout(() => {
          this.errorMessage = ""; 
      }, 3000);
      }
      })
      
      
    }
    navigateTo(route:string){
      this.router.navigate([`${route}`])
    }
  }
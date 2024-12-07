import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false
  errorMessage:string|null=null

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

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
    const {email, password} = value
    console.log(this.loginForm.controls);
    this.submitted = true
    this.errorMessage=null
    if(status == "INVALID") 
      return
    console.log(this.loginForm);
    console.log(this.loginForm.controls);
    this.userService.loginApiCall({email, password}).subscribe({next: (res: any) => {
      console.log(res);
      const token = (res as {data:{ token: string }}).data.token;
      localStorage.setItem("authtoken", token)
      this.router.navigate(["/dashboard/notes"])
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
}

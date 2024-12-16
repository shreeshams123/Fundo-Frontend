import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockUserService:jasmine.SpyObj<UserService>;
  let mockRouter:jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockUserService=jasmine.createSpyObj('UserService',['registerApiCall']);
    mockRouter=jasmine.createSpyObj('Router',['navigate']);
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports:[HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers:[
      {provide:UserService,useValue:mockUserService},
      {provide:Router,useValue:mockRouter}
        
      ]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Name is required" when name is empty',()=>{
    const nameControl=component.signupControls['name'];
    nameControl.setValue('');
    nameControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(nameControl.errors?.['required']).toBeTruthy();
    const compiled=fixture.nativeElement;
    const errorElement=compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Name is required');
  });

  it('should show "Phone is required" when name is empty',()=>{
    const phoneControl=component.signupControls['phone'];
    phoneControl.setValue('');
    phoneControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(phoneControl.errors?.['required']).toBeTruthy();
    const compiled=fixture.nativeElement;
    const errorElement=compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Phone number is required');
  });

  it('should show "Invalid Phone number" when given invalid phone format',()=>
  {
    const phoneControl=component.signupControls['phone'];
    phoneControl.setValue('dsgfreg');
    phoneControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(phoneControl.errors?.['pattern']).toBeTruthy();
    const compiled=fixture.nativeElement;
    const errorElement=compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Invalid Phone number');
  })

  it('should show "Email is required" when name is empty',()=>{
    const emailControl=component.signupControls['email'];
    emailControl.setValue('');
    emailControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(emailControl.errors?.['required']).toBeTruthy();
    const compiled=fixture.nativeElement;
    const errorElement=compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Email is required');
  });

  it('should show "Invalid email format" for invalid email format', () => {
    const emailControl = component.signupControls['email'];
    emailControl.setValue('acisdhcfi');
    emailControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Invalid Email Format');
  });

  it('should show "Password is required" for empty password field', () => {
    const passwordControl = component.signupControls['password'];
    passwordControl.setValue('');
    passwordControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(passwordControl.errors?.['required']).toBeTruthy();
    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Password is required');
  });

  it('should show "Invalid password format" for invalid password format', () => {
    const passwordControl = component.signupControls['password'];
    passwordControl.setValue('acisdhcfi');
    passwordControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Password should contain minimum 8 characters ');
  });

  it('should show "Confirm password is required" for empty password field', () => {
    const passwordControl = component.signupControls['confirmPassword'];
    passwordControl.setValue('');
    passwordControl.markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(passwordControl.errors?.['required']).toBeTruthy();
    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Confirm Password is required');
  });

  it('should show "Passwords must match" when given different passwords',()=>{
    component.signupControls['password'].setValue('pass123');
    component.signupControls['confirmPassword'].setValue('pass1234');
    component.signupControls['confirmPassword'].markAsTouched();
    component.handleSignup();
    fixture.detectChanges();
    expect(component.signupControls['confirmPassword'].hasError('mustMatch')).toBeTrue();
    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Password must match');
  });

  it('should navigate to login page after successful login',()=>{
    component.signupForm.setValue({
      name:'shreesha',
      phone:'5673827635',
      email:'shreesha@gmail.com',
      password:'Shreesha@123',
      confirmPassword:'Shreesha@123'
    });
    const mockResponse: any = { data: { message: 'Registration successful' } };
    mockUserService.registerApiCall.and.returnValue(of(mockResponse));
    component.handleSignup();
    fixture.detectChanges();
    const successMessage = fixture.debugElement.query(By.css('.alert'));
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toContain('Registration successful');
    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    }, 2000);
  });
  
  })









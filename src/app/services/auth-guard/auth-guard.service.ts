import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if(localStorage.getItem('authtoken')) {
      return true;
    } else {
      // Navigate to '/login'
      this.router.navigate(['/']);
      return false
    }
  }
}

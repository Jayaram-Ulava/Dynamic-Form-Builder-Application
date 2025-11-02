import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
type Role = 'admin' | 'user' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private role$ = new BehaviorSubject<Role>(this.getStoredRole());
  roleChanges = this.role$.asObservable();
userRole$: Observable<unknown> | Subscribable<unknown> | Promise<unknown> | undefined;

  loginAs(role: 'admin' | 'user') {
    localStorage.setItem('role', role);
    this.role$.next(role);
  }

  logout() {
    localStorage.removeItem('role');
    this.role$.next(null);
  }

  getRole(): Role {
    return this.role$.value;
  }

  isAdmin() {
    return this.getRole() === 'admin';
  }

  isLoggedIn() {
    return this.getRole() !== null;
  }

  private getStoredRole(): Role {
    const r = localStorage.getItem('role');
    return r === 'admin' || r === 'user' ? r : null;
  }
}

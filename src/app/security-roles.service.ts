import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityRolesService {

  constructor() { }
  roles: string[] = [];


  addRoles(roles: string[]): void {
    this.roles = roles;
  }

  getRoles(): string[] {
    return this.roles;
  }
}

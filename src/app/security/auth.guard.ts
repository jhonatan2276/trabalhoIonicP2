import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.service.authenticatedUser == true) {
      return true;
    }

    this.service.simpleAlert (
      "Alerta",
      "Você não tem permissão para acessar o sistema",
      "Você será redirecionado para tela de Login"
    )

    this.router.navigate(['/home']);
    return false;
  }
}

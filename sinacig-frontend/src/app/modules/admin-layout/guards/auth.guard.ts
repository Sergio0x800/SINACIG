import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../../services/token.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router, private usuarioService: UsuarioService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   const token = this.tokenService.getToken();
    //   if(!token) {
    //     this.router.navigate(['/auth/login']);
    //     return false;
    //   }
    // return true;
    // return this.usuarioService.user$
    // .pipe(
    //   map(user => {
    //     if(!user) {
    //         this.router.navigate(['/auth/login']);
    //         return false;
    //       }
    //     return true;
    //   })
    // )

    const token = this.tokenService.getToken();
    return this.usuarioService.user$
    .pipe(
      map((user) => {
        if (token) {
          return true;
        } else if (!user) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        return true;
      })
    );
  }

}

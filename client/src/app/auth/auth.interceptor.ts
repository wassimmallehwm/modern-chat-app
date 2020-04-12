import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authToken: any;
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authToken)
    });
    return next.handle(authRequest);
  }
}

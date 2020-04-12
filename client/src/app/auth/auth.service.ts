import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

//declare var swal: any;


const BACKEND = environment.api + 'user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatus = new Subject<boolean>();
  private userIsAuthenticated = false;


  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }
  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  // getCurrentUsername() {
  //   return localStorage.getItem('username');
  // }

  checkAuth() {
    this.getCurrentUser().subscribe(async (data: any) => {
      const storedId = await localStorage.getItem('userId');
      if (data && data._id === storedId) {
        this.userIsAuthenticated = true;
      } else  {
        this.userIsAuthenticated = false;
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.userIsAuthenticated = false;
        }
      }
    });
  }

  getIsAuth() {
    return this.userIsAuthenticated;
  }
  setIsNotAuth () {
    this.userIsAuthenticated = false;
  }

  getOne(id: any) {
    return this.http.post(BACKEND + 'getOne/' + id, {});
  }

  getCurrentUser() {
    return this.http.post(BACKEND + 'currentUser/', {});
  }


  createUser(authData: any) {
    this.http.post(BACKEND + 'create', authData)
    .subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      this.authStatus.next(false);
    });
  }

  login(authData: any) {
    this.http.post<{token: string}>
    (BACKEND + 'login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.userIsAuthenticated = true;
        this.authStatus.next(true);
        this.getCurrentUser().subscribe((data: any) => {
          const userId = data._id;
          this.saveAuthData(token, data);
          this.setCnxDate(this.token, userId);
          this.router.navigate(['/chat']);
        });
      }
    }, error => {
      // if (error instanceof HttpErrorResponse) {
      //   if (error.status === 401) {
      //     swal({
      //       title: 'Warning !',
      //       text: error.error.message,
      //       type: 'warning'
      //     });
      //   }
      // }
      console.log(error);
      this.authStatus.next(false);
    });
  }

  setCnxDate(token: any, userId: any) {
    const obj = {
      lastCnx: new Date()
    };
    this.http.post(BACKEND + 'lastCnx/' + userId, obj).subscribe(data => {

    });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    } else {
      this.token = authInfo.token;
      this.userIsAuthenticated = true;
      this.authStatus.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      return;
    }
    return {
      token: token,
      user: user
    };


  }

  logout() {
    this.token = null;
    this.userIsAuthenticated = false;
    this.authStatus.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

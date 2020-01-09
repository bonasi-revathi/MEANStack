import { Injectable } from '@angular/core';
import { User } from './register/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:3000/api/users/';
  user: any;
  logincount: any;

  constructor(private http: HttpClient) { }

  getuser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('user', this.user.email);
    return this.user.email;
  }
  createUser(userData: User) {
    console.log(userData);

    const registerUserPromise = new Promise( (resolve, reject) =>{
      this.http.post(this.url, userData)
            .toPromise()
            .then( ( res) => {
              console.log(res);
              resolve(res);
            })
            .catch( (err: User) => {
              console.log(err);
            })
            .finally( () => {
              console.log('posted data successfully');
            });
    } );

    return registerUserPromise;

  }
  getUsers(): Observable<User[]> {


    return this.http.get(this.url).
      pipe(map((resp: User[]) => {
        console.log(resp);
        return resp;
      }));

  }

  loginUser(params) {
     const loginUserData = new Promise((resolve, reject) => {
          this.http.post(this.url +'/'+'login', params)
          .toPromise()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            console.log('successfully login')
          });
     });
     return loginUserData;
  }




}

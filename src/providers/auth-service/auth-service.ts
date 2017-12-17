import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

    public fireAuth: any;
    public userData: any;

  constructor(public http: HttpClient) {
      console.log('Hello AuthService Provider');
      this.fireAuth = firebase.auth();
      this.userData = firebase.database().ref('/userData');
  }

  doLogin(email: string, password: string): any {
      return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): any {
      return this.fireAuth.createUserWithEmailAndPassword(email, password)
          .then((newUser) => {
              this.userData.child(newUser.uid).set({ email: email });
          });
  }

  resetPassword(email: string): any {
      return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
      return this.fireAuth.signOut();
  }

}

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from "rxjs";
import { AuthData } from './auth-data.model';
import { Token } from '@angular/compiler';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private userId: string;
  private isAuthenticated: boolean;

  private authStatusListener = new Subject<boolean>();
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
     }

     // Create New user
     createUser(email: string, password: string){
      console.log(email, password);
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
          this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token:string)=> this.token = token
          );
          this.router.navigate(['/']);
       // this.toast.success("You have successfully signed in")
        
       // return this.setUserDoc(user) // create initial user document
      })
      .catch(error => console.log(error)
       );
     }
     async loginUser(email: string, password: string){
      console.log(email, password);
      return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(
        response=>{
         // this.toast.success('Your login is Successful')
          this.router.navigate(['/']);
        this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token:string)=>this.token=token
          );
      }
      )
      .catch(error =>
         console.log(error)
         );
     }
     updateUser(){

     }
     logoutUser(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.userId = null;
     }
     getToken() {
      return this.token;
    }
    getIsAuth() {
      return this.isAuthenticated;
    }
    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }
    getUserId() {
      return this.userId;
    }

        // Sets user data to firestore after succesful login
       /* async googleSignin() {
          const provider = new auth.GoogleAuthProvider();
          const credential = await this.afAuth.auth.signInWithPopup(provider);
          return this.setUserDoc(credential.user);
        }
    
        async facebookSignin() {
          const provider = new auth.FacebookAuthProvider();
          const credential = await this.afAuth.auth.signInWithPopup(provider);
          return this.setUserDoc(credential.user);
        }
        private setUserDoc(user) {
  
          const userRef: AngularFirestoreDocument<AuthData> = this.afs.doc(`users/${user.uid}`);
          const data: AuthData = {
            uid: user.uid,
            email: user.email,
            photoURL: 'https://goo.gl/Fz9nrQ'
          }
      
          return userRef.set(data, { merge: true })
      
        }*/
}
  /*private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

 

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {

  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {

            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}*/

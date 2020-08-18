import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from "rxjs";
import { auth } from 'firebase/app';
import { UserData } from './user-data.model';
import { Token } from '@angular/compiler';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private userId: string;
  private isAuthenticated: boolean;
  userData:any;
  private authStatusListener = new Subject<boolean>();
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
          this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
     }
     // Create New user
     createUser(email: string, password: string){
     // console.log(email, password);
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => { 
        console.log(response);
        this.SendVerificationMail();
        this.setUserDoc(response.user);
        /*if(response){
          
          response.getToken().then(token =>{
            this.token = token;
            if (token) {
            this.isAuthenticated = true;
            this.userId = res.user.uid;
            this.authStatusListener.next(true);
          }
          })
         // this.toast.success('Your login is Successful')
        this.router.navigate(['/']);
        }*/

          // return this.setUserDoc(response.user);
         // this.router.navigate(['/']);
       // this.toast.success("You have successfully signed in")
        
       // return this.setUserDoc(user) // create initial user document
      })
      .catch(error => console.log(error)
       );
     }
     async loginUser(email: string, password: string){
      return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(
        (response) =>{
             this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
         this.setUserDoc(response.user);
         /* response.getToken().then(token =>{
            this.token = token;
            if (token) {
            this.isAuthenticated = true;
            this.userId = res.user.uid;
            this.authStatusListener.next(true);
          }
          })
         // this.toast.success('Your login is Successful')
        this.router.navigate(['/']);*/
      })
      .catch(error =>
         console.log(error)
         );
     }
       // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['auth/verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
 /* get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return (user !== null && user.emailVerified !== false) ? true : false;
  
 };*/
     logoutUser(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.userId = null;
      return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
    })
     }
     getToken() {
      return this.token;
    }
    getIsAuth() {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user !== null && user.emailVerified !== false){
         this.authStatusListener.next(true);
         this.isAuthenticated = true;
         this.userId = user.uid;
      }
      this.router.navigate(['header']);
      return this.isAuthenticated;
    }
    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }
    getUserId() {
      return this.userId;
    }
        // Sets user data to firestore after succesful login
        async googleSignin() {
          const provider = new auth.GoogleAuthProvider();
          await this.afAuth.auth.signInWithPopup(provider).then(res =>{
            //console.log(res);
           const token = (<any>res).credential.accessToken;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.userId = res.user.uid;
            this.authStatusListener.next(true);
          } 
          return this.setUserDoc(res.user);
        })
         this.router.navigate(["/"]);
        }
        async facebookSignin() {
          const provider = new auth.FacebookAuthProvider();
          const credential = await this.afAuth.auth.signInWithPopup(provider);
          return this.setUserDoc(credential.user);
        }
        private setUserDoc(user) {
          const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`users/${user.uid}`);
          const data: UserData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          }
          return userRef.set(data, { merge: true })
        }
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
    const authData: UserData = { email: email, password: password };
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
            this.saveUserData(token, expirationDate, this.userId);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getUserData();
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
    this.clearUserData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveUserData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearUserData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getUserData() {
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

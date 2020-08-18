import { Component, OnInit } from "@angular/core";
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app";
  userIsAuthenticated : boolean;
  private authListenerSubs: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
       this.router.navigate(['/']);
  }
}

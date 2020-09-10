import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }
  
  userDetails;

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this._userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    )
  }

  logout(){
    this._userService.deleteToken();
    this._router.navigate(['/login']);
  }

  moveToProfile(){
    this._router.navigate(['/profile']);
  }

}

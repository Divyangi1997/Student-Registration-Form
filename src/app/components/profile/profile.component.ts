import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  
  moveToDashboard(){
    this._router.navigate(['/dashboard']);
  }

}

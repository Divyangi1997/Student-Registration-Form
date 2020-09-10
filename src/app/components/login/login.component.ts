import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

function symbolValidator(control){ 
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,[Validators.required,symbolValidator,Validators.minLength(5)])
  });

  constructor(private _userService: UserService, private _router: Router) { }

  serverErrorMessages: string;

  ngOnInit(): void {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      console.log("Invalid"); return;
    }

    this._userService.login(this.loginForm.value)
    .subscribe(
      res => { 
        this._userService.setToken(res['token']);
        this._router.navigateByUrl('/dashboard'); 
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }
}

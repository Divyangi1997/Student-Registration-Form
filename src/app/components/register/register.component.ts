import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

function symbolValidator(control){ 
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    rollno: new FormControl(null, Validators.required),
    department: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required,symbolValidator,Validators.minLength(5)]),
    cpassword: new FormControl(null, Validators.required)
  })

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  moveToLogin(){
    this._router.navigate(['/login'])
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)){
      console.log('Invalid Form'); return;
    } 

    this._userService.register(this.registerForm.value)
    .subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this._router.navigate(['/login']);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong.';
        }
      }
    );
  }
}

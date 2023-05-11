import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public user: any;
  error?: string;
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  loginCheck(f: NgForm){
    console.log(f.controls["email"]);
    
    
    this._userService.login({'username': f.controls["email"].value, 'password': f.controls["password"].value}).subscribe((data: any) => {
          console.log(data);
          
          this._userService.updateData(data['access']);
          this.router.navigate(['/list-images'])
        },
        err => {
          console.log(err, "erreur");
          this.error = err.error['detail'];
          console.log(this.error, "this");
          
        })

    
  }
 
  refreshToken() {
    this._userService.refreshToken();
  }
 
  logout() {
    this._userService.logout();
  }

}

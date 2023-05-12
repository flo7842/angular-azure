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
  errors: string[] | null = null;
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  loginCheck(f: NgForm){
      this._userService.login({'username': f.controls["email"].value, 'password': f.controls["password"].value}).subscribe(
        (data: any) => {
        
        this._userService.updateData(data['access']);
        this.router.navigate(['/list-images'])
      }, (err: any) => {
          this.errors = err
      })
  }
 
  refreshToken() {
    this._userService.refreshToken();
  }
 
  logout() {
    this._userService.logout();
  }

}

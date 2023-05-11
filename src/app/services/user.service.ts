import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observeOn } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UserService {

   // http options used for making API calls
   private httpOptions: any;
 
   // the actual JWT token
   public token: string | null = null;
  
   // the token expiration date
   public token_expires: Date | null = null;
  
   // the username of the logged in user
   public username: string | null = null;
  
   // error messages received from the login attempt
   public errors: any = [];
  
   constructor(private http: HttpClient) {
     this.httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
   }

 
  public login(user: any):Observable<any> {
    return this.http.post(environment.api_host + '/api/token/', JSON.stringify(user), this.httpOptions)
    // .subscribe(
    //   (data: any) => {
    //     console.log(data);
        
    //     this.updateData(data['access']);
    //   },
    //   err => {
    //     console.log(err, "erreur");
    //     this.errors = err.error['detail'];
    //     console.log(this.errors, "this");
        
    //   }
    // );
  }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      (data: any) => {
        this.updateData(data['token']);
      },
      (err: any) => {
        console.log(err, "erreur");
        
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }
 
  public updateData(token: string) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log(token_decoded);
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}

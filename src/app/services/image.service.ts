import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@azure/storage-blob';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private httpOptions: any;
  images: string[] = ["assets/img/food.jpg", "assets/img/chicken-tika.jpg", "assets/img/food.jpg", 
  "assets/img/chicken-tika.jpg", "assets/img/food.jpg", "assets/img/chicken-tika.jpg",
  "assets/img/chicken-tika.jpg", "assets/img/food.jpg", "assets/img/tomatoes.jpg"];

  basePathApi = environment.api_host + "/api";

  constructor(private httpClient: HttpClient) {
    
   }

  add(name: string, base64: string){
    let userToken = JSON.parse(localStorage.getItem("user") || '{}')
    
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', "Authorization": `Bearer ${userToken}`})
    };
    return new Promise((resolve, rejects) => {
      this.httpClient.post(this.basePathApi + '/images', { name: name, base64: base64 }, {headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${userToken}`}}).subscribe((data: any) => {
        if(data){
          resolve(data);
        }
      }, (err) =>{
        if(err){
          rejects(err);
        }
    });
    });
  }

  get(){
    return this.images;
  }
}

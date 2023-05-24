import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http:HttpClient) { }


  baseUrl: string = 'http://localhost/phprestAPI/'
  getDetails(){
    return this.http.get<any>(this.baseUrl+'staff.php')
  }
  subDetails(){
    return this.http.get<any>(this.baseUrl+'subject.php')
  }
  // subDetails(){
  //   return this.http.get<any>(this.baseUrl+'subject.php')
  // }

}

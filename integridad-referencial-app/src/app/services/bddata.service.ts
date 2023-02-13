import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BddataService {
  url = "http://localhost:3000";
  
  constructor(
    private http:HttpClient
   ) { }
  
   getBds():any{
    return this.http.get(this.url);
   }

}

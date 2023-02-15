import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BddataService {
  url = "http://localhost:3000";
  urlReferencedTables = "http://localhost:3000/fk/";
  
  constructor(
    private http:HttpClient
   ) { }
  
   getBds():any{
    return this.http.get(this.url);
   }
   getReferencedTables(dbName:string):any {
    const urlRef = this.urlReferencedTables+dbName;
    return this.http.get(urlRef);
   }

}

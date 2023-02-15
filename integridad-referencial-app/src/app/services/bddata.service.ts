import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BddataService {
  url = "http://localhost:3000";
  urlReferencedTables = "http://localhost:3000/fk/";
  urlDbcc = "http://localhost:3000/dbcc/"
  urlTriggers = "http://localhost:3000/triggers/"
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
   getDbccConstraints(dbName:string):any{
    const urlRef = this.urlDbcc+dbName;
    return this.http.get(urlRef);
   }
   getTriggers(dbName:string):any{
    const urlRef = this.urlTriggers+dbName;
    return this.http.get(urlRef);
   }

}

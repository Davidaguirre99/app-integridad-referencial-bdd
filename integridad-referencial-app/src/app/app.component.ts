import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BddataService } from './services/bddata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'integridad-referencial-app';
  listaBds = [];
  constructor(
    private serviceBd:BddataService,
    private readonly router:Router
  ){ 
    this.showBds();
  }

  showBds(){
    this.serviceBd.getBds()
    .subscribe((data:any)=>{      
      this.listaBds = data;
      console.log("Bds",this.listaBds);
    })
  }
  verDetalle(dbName:string){
    const ruta = ['/detalleBd',dbName];
    this.router.navigate(ruta);
  }
}

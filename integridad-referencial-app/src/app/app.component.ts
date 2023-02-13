import { Component } from '@angular/core';
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
    private serviceBd:BddataService
  ){ 
    this.showBds();
  }

  showBds(){
    this.serviceBd.getBds()
    .subscribe((data:any)=>{
      console.log("data",data);
      this.listaBds = data;
    })
  }

}

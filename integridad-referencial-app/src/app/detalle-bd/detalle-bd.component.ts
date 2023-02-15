import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BddataService } from '../services/bddata.service';

@Component({
  selector: 'app-detalle-bd',
  templateUrl: './detalle-bd.component.html',
  styleUrls: ['./detalle-bd.component.scss']
})
export class DetalleBdComponent implements OnInit {

  nombreDb = '';
  details:any;
  constructor(
    private serviceBd:BddataService,
    private readonly routeParams:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getParamNameDb()
    this.getDetails();
  }

  getParamNameDb(){
    const $params = this.routeParams.params;
    $params.subscribe({
      next:(parameter)=>{
        console.log("paremeter =",parameter);
        this.nombreDb = parameter['dbName'];
      }
    })
    // const $obsDetails=this.getDetails();
    //     $obsDetails.subscribe({
    //       next:(det:any)=>{
    //         console.log("detail=",det);
    //         this.details=det;
    //         console.log("details=",this.details);
    //       }
    //     })
  }

  getDetails(){
    this.serviceBd.getReferencedTables(this.nombreDb).subscribe((dato:any)=>{
      console.log("dato any=",dato);
      this.details=dato;
    })
  }

}

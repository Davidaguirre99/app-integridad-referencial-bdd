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
  detailsDbcc:any;
  detailsTriggers:any;
  constructor(
    private serviceBd:BddataService,
    private readonly routeParams:ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.getParamNameDb()
    this.getDetails();
    this.getDetailsDbcc();
    this.getDetailsTriggers();
  }

  getParamNameDb(){
    const $params = this.routeParams.params;
    $params.subscribe({
      next:(parameter)=>{
        console.log("paremeter =",parameter);
        this.nombreDb = parameter['dbName'];
      }
    })
  }

  getDetails(){
    this.serviceBd.getReferencedTables(this.nombreDb).subscribe((dato:any)=>{
      console.log("dato any=",dato);
      this.details=dato;
    })
  }
  getDetailsDbcc(){
    this.serviceBd.getDbccConstraints(this.nombreDb).subscribe((dato:any)=>{
      console.log("dato dbcc",dato);
      this.detailsDbcc=JSON.stringify(dato);
    })
  }
  getDetailsTriggers(){
    this.serviceBd.getTriggers(this.nombreDb).subscribe((dato:any)=>{
      console.log("triggers",dato)
      this.detailsTriggers= JSON.stringify(dato);
    })
  }

  downloadFile(){
    const fechaActual = new Date();
    let contenido  = 'Log de Auditoria de la base de datos '+ this.nombreDb+'\n';
    contenido = contenido + "Fecha de Auditoria: "+ fechaActual.getDate()+'-'+(fechaActual.getMonth()+1)+'-'+fechaActual.getFullYear()+'\n';
    contenido = contenido + 'Tablas con Referencias:\n'+JSON.stringify(this.details)+'\n';
    contenido = contenido + 'Anomalias de Base de Datos:\n'+ this.detailsDbcc+'\n';
    contenido = contenido + 'Triggers en Base de Datos: \n'+this.detailsTriggers+'\n';
    let nombre = "logAuditoria"+this.nombreDb+fechaActual.getDate()+'-'+(fechaActual.getMonth()+1)+'-'+fechaActual.getFullYear();
    const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleBdComponent } from './detalle-bd/detalle-bd.component';

const routes: Routes = [
  {
    path:'detalleBd/:dbName',
    component:DetalleBdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

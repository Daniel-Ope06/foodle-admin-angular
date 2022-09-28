import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {path:'create', title: 'Foodle Create', component: CreateComponent},
  {path:'read', title: 'Foodle Read', component: ReadComponent},
  {path:'update', title: 'Foodle Update', component: UpdateComponent},
  {path:'delete', title: 'Foodle Delete', component: DeleteComponent},
  {path:'', redirectTo: 'create', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedTableComponent } from './components/created-table/created-table.component';
import { CreateTableComponent } from './components/create-table/create-table.component';

const routes: Routes = [
  {path:'', redirectTo:'create-table', pathMatch:'full'},
  {path:'create-table', component: CreateTableComponent},
  {path:'created-table', component: CreatedTableComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

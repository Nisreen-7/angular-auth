import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListUserComponent } from './list-user/list-user.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: '' , component:HomeComponent},
  {path: 'register' , component:RegisterComponent},
  {path: 'list-user', component: ListUserComponent, canActivate: [authGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

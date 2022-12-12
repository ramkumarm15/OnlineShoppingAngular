import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './Component/home/home.component';
import {LoginComponent} from './Component/login/login.component';
import {ProfileComponent} from './Component/profile/profile.component';
import {RegisterComponent} from './Component/register/register.component';
import {AuthGuard} from './Guard/auth.guard';
import {CartComponent} from "./Component/cart/cart.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user/cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {HomeComponent} from '../Component/home/home.component';
import {LoginComponent} from '../Component/login/login.component';
import {RegisterComponent} from '../Component/register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ProfileComponent} from '../Component/profile/profile.component';
import {TabComponent} from '../Component/profile/Tab/tab.component';
import {TabProfileComponent} from '../Component/profile/Tab/tabProfile/tabProfile.component';
import {TabPasswordComponent} from '../Component/profile/Tab/tab-password/tab-password.component';
import {BillingAddressComponent} from "../Component/profile/Tab/billing-address/billing-address.component";
import {CartComponent} from "../Component/cart/cart.component";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    TabComponent,
    TabProfileComponent,
    TabPasswordComponent,
    BillingAddressComponent,
    CartComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    TabComponent,
    TabProfileComponent,
    TabPasswordComponent,
    BillingAddressComponent,
    CartComponent
  ],
})
export class SharedModule {
}

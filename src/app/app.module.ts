import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

/**
 * App routing
 */
import {AppRoutingModule} from './app-routing.module';

/**
 * Third-party Modules
 */
import {FilterPipeModule} from "ngx-filter-pipe";
import {MaterialModule} from './material/material.module';

/**
 * Components
 */
import {AppComponent} from './app.component';
import {LoginComponent} from "./Component/login/login.component";
import {RegisterComponent} from "./Component/register/register.component";
import {HomeComponent} from "./Component/home/home.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {ProfileComponent} from "./Component/profile/profile.component";
import {TabComponent} from "./Component/profile/Tab/tab.component";
import {TabProfileComponent} from "./Component/profile/Tab/tabProfile/tabProfile.component";
import {TabPasswordComponent} from "./Component/profile/Tab/tab-password/tab-password.component";
import {BillingAddressComponent} from "./Component/profile/Tab/billing-address/billing-address.component";
import {UpdateBillingComponent} from './Component/profile/Tab/billing-address/update-billing/update-billing.component';
import {CreateBillingComponent} from './Component/profile/Tab/billing-address/create-billing/create-billing.component';
import {CartComponent} from "./Component/cart/cart.component";

/**
 * Interceptors
 */
import {HttpReqInterceptor} from './Interceptor/httpreq.interceptor';
import {ErrorInterceptor} from './Interceptor/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    TabComponent,
    TabProfileComponent,
    TabPasswordComponent,
    BillingAddressComponent,
    UpdateBillingComponent,
    CreateBillingComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

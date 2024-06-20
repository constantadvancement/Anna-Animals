import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, withFetch } from "@angular/common/http";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceService } from "./service.service";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule //always last I
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    ServiceService
  ],
  bootstrap: []
})
export class AppModule { }

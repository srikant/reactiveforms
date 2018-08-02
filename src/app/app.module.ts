import { BrowserModule } from '@angular/platform-browser';




//
// HttpClientModule,
// HttpClientInMemoryWebApiModule.forRoot(ProductData),
// import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';
  import { ProductData } from './products/product-data';
  import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CustomerComponent } from './customers/customer.component';

/* Feature Modules */
// import { ProductModule } from './products/product.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

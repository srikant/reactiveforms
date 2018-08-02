import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { CustomerComponent } from './customers/customer.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
          {
            path: 'products',
            loadChildren: './products/product.module#ProductModule'
          },
          {
            path: 'welcome',
            component: WelcomeComponent
          },
          {
            path: 'customer',
            component: CustomerComponent
          },
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
          },
            { path: '**', component: WelcomeComponent }
        ]) // , { enableTracing: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

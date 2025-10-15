import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormProductComponent } from './form-product/form-product.component';


const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'products/add', component: FormProductComponent },
  { path: 'products/edit/:id', component: FormProductComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products/add', component: AddProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

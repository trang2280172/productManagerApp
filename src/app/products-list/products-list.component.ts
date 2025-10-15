import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  allProducts: Product[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  productIdToNavigate: number = 0;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        //this.products = data.slice(0, 5);
        console.log('GET Success:', this.products);
      },
      error: (err) => console.error('GET Error:', err),
      complete: () => {
        this.loading = false;
        console.log('GET Completed.');
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term || term.length === 0) {
      this.products = this.allProducts;
      return;
    }
    this.products = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }

  goToProductDetail(productId: number): void {
    this.productIdToNavigate = productId;
    this.router.navigate(['/products', this.productIdToNavigate]);
    console.log(`ID bài đăng cần xử lý: /product/${this.productIdToNavigate}`);
    this.productIdToNavigate = 0;
  }

  addProduct() {
    this.router.navigate(['/products/add']);
    console.log(`Đang điều hướng đến/products/add`);
  }

  editProduct(productId: number): void {
    this.productIdToNavigate = productId;
    this.router.navigate(['/products/edit', this.productIdToNavigate])
    console.log(`ID sản phẩm cần sửa: /products/edit/${this.productIdToNavigate}`);
    this.productIdToNavigate = 0;
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  productId: number | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.detailProduct();
    });
  }

  detailProduct(): void {
    if (this.productId && !isNaN(this.productId)) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          console.log('GET Success:', this.product);
        },
        error: (err) => console.error('GET Error:', err),
        complete: () => {
          console.log('GET Completed.');
        }
      });
    }
    else {
      console.error("ID sản phẩm không hợp lệ.");
    }
  }
  onDeleteProduct(): void {
    if (this.productId !== null) {
      if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ID ${this.productId} không?`)) {
        this.productService.deleteProduct(this.productId).subscribe({
          next: (response) => {
            console.log('Sản phẩm đã xóa thành công:', response);
            alert(`Sản phẩm ID ${this.productId} đã được xóa!`);
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Lỗi khi xóa sản phẩm:', err);
            alert('Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại.');
          }
        });
      }
    }
  }
  editProduct(): void {
    this.router.navigate(['/product/edit', this.productId])
    console.log(`ID sản phẩm cần sửa: /product/edit/${this.productId}`);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}

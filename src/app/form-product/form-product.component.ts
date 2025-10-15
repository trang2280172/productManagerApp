import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  loading: boolean = false;
  isEditMode: boolean = false;
  productId!: number;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEditMode = true;
        this.productId = +params.get('id')!;
      }
      this.initForm();
    });
  }

  initForm(): void {
    this.productForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'price': new FormControl(null, [
        Validators.required,
        Validators.min(0.01)
      ]),
      'description': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'image': new FormControl(null),
      'rating': new FormGroup({
        'rate': new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(5)
        ]),
        'count': new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$')
        ])
      })
    });
    if (this.isEditMode) {
      this.loading = true;
      this.productService.getProductById(this.productId).subscribe(product => {
        this.productForm.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count
          }
        });
      });
    }
  }

  onSubmit() {
    //console.log('Giá trị form:', this.productForm.value);
    if (this.productForm.valid) {
      this.loading = true;
      const formData: Product = this.productForm.value;
      if (this.isEditMode) {
        this.productService.updateProductById(this.productId, formData).subscribe({
          next: (response: Product) => {
            console.log('Sản phẩm sửa thành công', response);
            alert(`Sản phẩm "${response.title}" với ID: ${response.id} đã được sửa`);
            this.productForm.reset();
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Lỗi khi sửa sản phẩm:', err);
            alert('Đã xảy ra lỗi khi cập nhật dữ liệu lên server.');
          },
          complete: () => {
            this.loading = false;
          }
        })

      } else {
        this.productService.createProduct(formData).subscribe({
          next: (response: Product) => {
            console.log('Sản phẩm thêm thành công', response);
            alert(`Sản phẩm "${response.title}" đã được thêm với ID: ${response.id}`);
            this.productForm.reset();
          },
          error: (err) => {
            console.error('Lỗi khi thêm sản phẩm:', err);
            alert('Đã xảy ra lỗi khi gửi dữ liệu lên server.');
          },
          complete: () => {
            this.loading = false;
          }
        })
      }
    }
    else {
      console.error('Lỗi: Form không hợp lệ.');
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}

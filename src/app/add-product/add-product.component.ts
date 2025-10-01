import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  postForm!: FormGroup;
  loading: boolean = false;
  userId: string | null = null;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      /*'id': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),*/
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
  }

  onSubmit() {
    console.log('Trạng thái form hợp lệ:', this.postForm.valid);
    console.log('Giá trị form:', this.postForm.value);

    if (this.postForm.valid) {
      alert(`Thêm thành công ${this.postForm.value.title}`);
      this.submitNewPost();
      this.postForm.reset();
    }
    else {
      console.error('Lỗi: Form không hợp lệ.');
    }
  }

  submitNewPost(): void {
    this.loading = true;
    const newPostData: Post = this.postForm.value;

    this.apiService.createPost(newPostData).subscribe({
      next: (response: Post) => {
        console.log('✅ Sản phẩm đã được tạo thành công!', response);
        alert(`Sản phẩm "${response.title}" đã được thêm với ID: ${response.id}`);
        this.postForm.reset();
      },
      error: (err) => {
        console.error('❌ Lỗi khi thêm sản phẩm:', err);
        alert('Đã xảy ra lỗi khi gửi dữ liệu lên server.');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}

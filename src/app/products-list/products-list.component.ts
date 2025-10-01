import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  posts: Post[] = [];
  newPostResponse: Post | null = null;
  loading: boolean = false;
  productIdToNavigate: number = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 5);
        console.log('GET Success:', this.posts);
      },
      error: (err) => console.error('GET Error:', err),
      complete: () => {
        this.loading = false;
        console.log('GET Completed.');
      }
    });
  }

  goToProductDetail(postId: number): void {
    this.productIdToNavigate = postId;
    this.router.navigate(['/product', this.productIdToNavigate]);
    console.log(`ID bài đăng cần xử lý: /product/${this.productIdToNavigate}`);
  }

  addProduct() {
    this.router.navigate(['/products', 'add']);
    console.log(`Đang điều hướng đến /products/add`);
  }
}


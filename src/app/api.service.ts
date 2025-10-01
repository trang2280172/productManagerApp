import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Post {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  createPost(postData: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, postData);
  }
  getPostById(id: number): Observable<Post> {
    const url = `${this.baseUrl}/${id}`;
    console.log(`[API] Đang gọi chi tiết sản phẩm: ${url}`);
    return this.http.get<Post>(url);
  }
  deleteProduct(id: number): Observable<Post> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<Post>(deleteUrl);
  }
}


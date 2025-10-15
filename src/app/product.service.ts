import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
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
export class ProductService {

  private baseUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productData);
  }
  getProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    console.log(`[API] Đang gọi chi tiết sản phẩm: ${url}`);
    return this.http.get<Product>(url);
  }
  deleteProduct(id: number): Observable<Product> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(deleteUrl);
  }
  updateProductById(id: number, updatedProductData: Product): Observable<Product> {
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.http.put<Product>(updateUrl, updatedProductData);
  }
}


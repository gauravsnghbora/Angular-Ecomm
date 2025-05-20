import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products'; // Path to your mock.json file

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl); // GET all products
  // }

//   getProductById(id: number): Observable<Product> {
//     return this.http.get<Product>(`${this.apiUrl}/${id}`); // GET product by id
//   }

//   createProduct(product: Product): Observable<Product> {
//     return this.http.post<Product>(this.apiUrl, product); // POST a new product
//   }

//   updateProduct(product: Product): Observable<Product> {
//     return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product); // PUT update existing product
//   }

//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`); // DELETE a product
//   }

}
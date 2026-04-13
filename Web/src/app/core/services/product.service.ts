import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductModel[]> {
      return this.http.get<ProductModel[]>(`${this.baseUrl}/products`);
  }

  getById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/products/${id}`);
  }

  create(product: Partial<ProductModel>): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUrl}/products`, product);
  }

  update(id: number, product: ProductModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }
}

import { Component, Inject, OnInit, PLATFORM_ID, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { ProductModel } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { NumberArrayPipe } from '../../core/helpers/number-array.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NumberArrayPipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  products = signal<ProductModel[]>([]);
  isEditMode = signal(false);
  searchTerm = signal('');

  productForm!: FormGroup;

  // Pagination signals
  currentPage = signal(1);
  pageSize = 5; // items per page

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  initForm() {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  loadProducts() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.productService.getAll().subscribe({
      next: res => this.products.set(res),
      error: err => console.error(err)
    });
  }

  // Filtered + paginated products
  filteredProducts = computed(() => {
    const filtered = this.products().filter(p =>
      p.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
    const start = (this.currentPage() - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  });

  totalPages = computed(() => {
    const total = this.products().filter(p =>
      p.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    ).length;
    return Math.ceil(total / this.pageSize);
  });

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    if (this.isEditMode()) {
      this.productService.update(formValue.id, formValue).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      this.productService.create(formValue).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  onEdit(product: ProductModel) {
    this.productForm.patchValue(product);
    this.isEditMode.set(true);
  }

  onDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.productForm.reset({ id: 0, name: '', price: 0 });
    this.isEditMode.set(false);
  }
}

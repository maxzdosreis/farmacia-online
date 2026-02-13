import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  productId!: number;

  categories = ['Destino', 'Rotina', 'Sazonal', 'Conveniência'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        description: [''],
        category: [''],
        active: [true]
      });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.productId = Number(id);

      this.productService.getProductById(Number(id)).subscribe({
          next: (product) => {
            this.form.patchValue(product)
          },
          error: (err) => {
            console.error(err);
          }
      });
    }
  }

  loadProduct() {
    this.productService.getById(this.productId).subscribe(product => {
      this.form.patchValue(product);
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const formValue = this.form.value;

    formValue.price = formValue.price.replace(',', '.');

    if (this.form.invalid) return;

    if (this.isEdit) {
      this.productService.update(this.productId, formValue)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.productService.create(formValue)
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}

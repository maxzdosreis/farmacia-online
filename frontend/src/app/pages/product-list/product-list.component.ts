import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit} from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentPage: number = 1;
    lastPage: number = 1;

    constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(page: number = 1): void {

        this.productService.getProducts(page).subscribe({
            next: (response) => {
                this.products = [...response.data];
                this.currentPage = response.current_page;
                this.lastPage = response.last_page;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Erro ao buscar produtos:', error);
            }
        });
    }
}
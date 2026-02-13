import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit} from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentPage: number = 1;
    lastPage: number = 1;
    searchTerm: string = '';
    errorMessage: string | null = null;
    isLoading: boolean = false;

    constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    search(): void {
        this.currentPage = 1;
        this.loadProducts(this.currentPage);
    }

    loadProducts(page: number = 1): void {
        this.errorMessage = null;
        this.isLoading = true;

        this.productService.getProducts(page, this.searchTerm)
          .subscribe({
            next: (response) => {
                this.products = [...response.data];
                this.currentPage = response.current_page;
                this.lastPage = response.last_page;
                this.isLoading = false;

                if (this.products.length === 0) {
                    this.errorMessage = 'Nenhum produto encontrado.'
                }

                this.cdr.detectChanges();

            },
            error: (error) => {
                console.error('Erro completo:', error);
                this.errorMessage = 'Erro ao conectar com o servidor';

                if(error.status === 0) {
                    this.errorMessage = 'Erro ao conectar com o servidor.';
                } else if (error.status === 404) {
                    this.errorMessage = 'Recurso não encontrado.';
                } else if (error.status === 500) {
                    this.errorMessage = 'Erro interno do servidor.';
                } else if (error.error?.message) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'Erro ao carregar produtos. Tente novamente!';
                }

                this.cdr.detectChanges();
            }
          });
    }
}
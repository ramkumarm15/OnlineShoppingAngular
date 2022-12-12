import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/Service/auth.service';
import {Title} from '@angular/platform-browser';
import {UserService} from 'src/app/Service/user.service';
import {ProductService} from "../../Service/product.service";
import {Product} from "../../Model/product";
import {Router} from "@angular/router";
import {CartOperations, CartPayload, CartResponse} from "../../Model/cart";
import {CartService} from "../../Service/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private documentTitle: Title,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private user: UserService,
    private productService: ProductService,
    private cartService: CartService,
  ) {
  }

  private pageTitle = "Online Shopping for Men & Women Shoes";

  name: string = '';
  id: number = 0;
  data: any;
  products !: Product[];
  searchQuery: any = {name: ''};

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);

    if (this.auth.getUserToken() != null) {
      this.name = this.user.preferredUserName;
      this.id = this.user.id;
    }
    this.getProducts()
  }

  private snackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: 3 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  getProducts() {
    this.productService.getProduct().subscribe({
      next: (products: Product[]) => {
        console.log(products)
        this.products = products;
        this.changeFilter("orderAsc")
      }
    })
  }

  changeFilter(orderByFilter: string) {
    this.router.navigate([''], {
      queryParams: {orderBy: orderByFilter}
    })

    switch (orderByFilter) {
      case "orderAsc":
        this.orderByAsc()
        break;
      case "orderDesc":
        this.orderByDesc()
        break;
    }
  }

  orderByAsc() {
    this.products.sort(function (a: Product, b: Product) {
      return (a.price - b.price)
    })
  }

  orderByDesc() {
    this.products.sort(function (a: Product, b: Product) {
      return (b.price - a.price)
    })
  }

  addToCart(productId: number) {
    const payload: CartPayload = {
      data: {
        productId,
        quantity: 1
      },
      operation: CartOperations.ADD
    }
    this.cartService.addToCart(payload).subscribe({
      next: (response: CartResponse) => {
        this.snackBar(response.message)
      }
    })
  }
}

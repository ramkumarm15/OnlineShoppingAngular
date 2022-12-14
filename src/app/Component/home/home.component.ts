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
import {duration, Notify} from "../../Model/notify";
import {NotificationComponent} from "../../shared/notification/notification.component";
import {NotifyService} from "../../Service/notify.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private documentTitle: Title,
    private auth: AuthService,
    private user: UserService,
    private productService: ProductService,
    private cartService: CartService,
    private notify: NotifyService
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

  getProducts() {
    this.productService.getProduct().subscribe({
      next: (products: Product[]) => {
        console.log(products)
        this.products = products;
        this.changeFilter("orderAsc")
      },
      error: (err: HttpErrorResponse) => {
        this.notify.error(err.error.message)
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
        this.notify.success(response.message)
      }
    })
  }
}

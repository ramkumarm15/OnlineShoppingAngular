import {Component, OnInit} from '@angular/core';
import {CartService} from "../../Service/cart.service";
import {Cart, CartOperations, CartPayload, CartResponse} from "../../Model/cart";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";
import {DATA, NotificationComponent} from "../../shared/notification/notification.component";
import {duration, Notify} from "../../Model/notify";
import {NotifyService} from "../../Service/notify.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  pageTitle: string = "Cart | Online Shopping for Men & Women Shoes"
  cartOfUser !: Cart;

  constructor(
    private documentTitle: Title,
    private notify: NotifyService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
    this.getCartData()
  }

  getCartData() {
    this.cartService.getCart().subscribe({
      next: (response: Cart) => {
        console.log(response)
        this.cartOfUser = response;
      }
    })
  }

  updateCart(productId: number, e: Event) {

    const qtyInput = e.target as HTMLInputElement;

    const payload: CartPayload = {
      data: {
        productId,
        quantity: qtyInput.valueAsNumber
      },
      operation: CartOperations.UPDATE
    }
    this.cartService.updateCartItem(payload).subscribe({
      next: (response: CartResponse) => {
        this.getCartData()
        this.notify.success(response.message)
      }
    })
  }

  deleteCart(productId: number) {

    const payload: CartPayload = {
      data: {
        productId,
        quantity: 0
      },
      operation: CartOperations.DELETE
    }
    this.cartService.deleteCartItem(payload).subscribe({
      next: (response: CartResponse) => {
        this.notify.success(response.message)
        this.getCartData()
      }
    })
  }
}

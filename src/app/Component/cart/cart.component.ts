import {Component, OnInit} from '@angular/core';
import {CartService} from "../../Service/cart.service";
import {Cart, CartOperations, CartPayload, CartResponse} from "../../Model/cart";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartOfUser !: Cart;

  constructor(
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.getCartData()
  }

  private snackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: 3 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
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
        this.snackBar(response.message)
        this.getCartData()
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
        this.snackBar(response.message)
        this.getCartData()
      }
    })
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart, CartPayload, CartResponse} from "../Model/cart";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CART_API: string = environment.CART_API.CART;
  private CART_ITEM: string = environment.CART_API.CART_ITEM;

  constructor(private http: HttpClient) {
  }

  /**
   * Send Request to Cart API for add cart item
   * @param payload
   */
  addToCart(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for update cart item
   * @param payload
   */
  updateCartItem(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for delete cart item
   * @param payload
   */
  deleteCartItem(payload: CartPayload): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.CART_ITEM}`, payload);
  }

  /**
   * Send Request to Cart API for get cart data of user
   */
  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_API}`);
  }
}

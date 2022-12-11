import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartPayload, CartResponse} from "../Model/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addToCart(payload:CartPayload):Observable<CartResponse>{
    return this.http.post<CartResponse>("https://localhost:44323/api/CartItem",payload);
  }
}

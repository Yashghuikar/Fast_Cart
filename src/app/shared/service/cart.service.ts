import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartArr: any = [];
  constructor(private shared: SharedService) {}
  addItemToCart(item: any) {
    this.cartArr.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartArr));

    this.shared.emitCardCount(this.cartArr.length);
    console.log('--------------------', this.cartArr.length);
  }

  getCartData() {
    // var cartItems = [];
    let cartData = localStorage.getItem('cartItems');

    if (cartData) {
      let cartItems = JSON.parse(cartData);
      return cartItems;
    }
  }
}

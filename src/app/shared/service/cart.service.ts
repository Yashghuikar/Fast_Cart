import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartArr: any = [];
  constructor(private shared: SharedService) {}
  addItemToCart(item: any) {
    // this.cartArr.push(item);

    const existingProductIndex = this.cartArr.findIndex(
      (p: any) => p.productName === item.productName
    );

    if (existingProductIndex !== -1) {
      // Update quantity or other fields of the existing product
      this.cartArr[existingProductIndex].quantity =
        Number(this.cartArr[existingProductIndex].quantity) +
        Number(item.quantity);
      // Update other fields as needed
    } else {
      // Add the product to the cart if it doesn't exist
      const productToAdd = { ...item };
      this.cartArr.push(item);
    }

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

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../home/top-deals/top-deals.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carData: any;
  orderObj: Order = new Order();
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    const product = this.cart.getCartData();
    console.log('102101021', product);

    if (product && product.length > 0) {
      this.carData = product;
      console.log('kjbkkjbjkkbjknkj', this.carData);
    }
    this.findTotalPrice();
  }

  changeAction(action: string, index: number) {
    if (action === 'increase') {
      this.carData[index].quantity++;
    } else {
      this.carData[index].quantity--;
    }

    this.carData[index].totalPrice =
      this.carData[index].price * this.carData[index].quantity;
    this.findTotalPrice();
    if (this.carData[index].quantity == 0) {
      const suru = confirm(
        'Are you suru you want to remove the item form list?'
      );

      if (suru) {
        this.carData.splice(index, 1);
      } else {
        this.carData[index].quantity = 1;
      }
    }
  }

  findTotalPrice() {
    this.orderObj.finalPrice = 0;
    this.carData.forEach((el: any) => {
      this.orderObj.finalPrice += el.totalPrice;
    });

    this.orderObj.totalItems = this.carData.length;
  }

  checkOut() {
    let order = new Order();
  }
}

export class Order {
  name!: string;
  mobileNo!: number;
  emailId!: string;
  finalPrice: number = 0;
  totalDiscount!: number;
  address!: string;
  product!: any;
  totalItems: number = 0;
  isPaymentSuccessfully!: boolean;
}

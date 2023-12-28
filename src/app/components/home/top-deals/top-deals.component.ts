import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.scss'],
})
export class TopDealsComponent implements OnInit {
  topDealsLists: any = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
  constructor(private http: HttpService, private cart: CartService) {}

  ngOnInit(): void {
    this.topDeals();
  }
  topDeals() {
    this.http.getDataFromServer('top-deals').subscribe(
      (res: any) => {
        if (res && res.products && res.products.length > 0) {
          this.topDealsLists = res.products;

          this.topDealsLists.forEach((el: any) => {
            el['quantity'] = null;
          });

          console.log('top-deals', this.topDealsLists);
        }
      },
      (error: any) => {},
      () => {}
    );
  }

  setTotalPrice(index: any, item: any) {
    this.topDealsLists[index].w = item.w;
    this.topDealsLists[index].sp = item.sp;
    this.topDealsLists[index].dis_val = item.dis_val;
  }

  addToCart(productObj: any) {
    if (productObj.quantity != 0) {
      let product = new Product();
      product.productName = productObj.llc_n;
      product.selectedWeight = productObj.w;
      product.quantity = productObj.quantity;
      product.price = productObj.sp;
      product.img = productObj.p_img_url;
      product.totalPrice = productObj.sp * productObj.quantity;
      product.discount = productObj.dis_val;
      this.cart.addItemToCart(product);
    } else {
      alert('Please select the Quantity');
    }
  }
}

export class Product {
  productName!: string;
  price!: number;
  quantity!: number;
  totalPrice!: number;
  discount!: number;
  selectedWeight!: string;
  img!: string;
}

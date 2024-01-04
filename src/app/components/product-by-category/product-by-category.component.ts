import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { Product } from '../home/top-deals/top-deals.component';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss'],
})
export class ProductByCategoryComponent implements OnInit {
  constructor(private http: HttpService, private cart: CartService) {}
  categoryList: any = [];
  productList: any = [];
  selectedCategory: string = '';

  ngOnInit(): void {
    this.getCategory();
    // this.getProductBycategory('ALL');
  }
  getCategory() {
    this.http.getDataFromServer('topcats').subscribe((res: any) => {
      if (res && res.length > 0) {
        this.categoryList = res.map((obj: any) => obj.top_category.name);
        // this.categoryList = res;
        this.categoryList.unshift('ALL');
        console.log('get category', this.categoryList);
        this.getProductBycategory('ALL');
      }
    });
  }
  getProductBycategory(category: any) {
    this.selectedCategory = category;
    let endPoint: string = 'categories?categoryName=' + category;

    this.http.getDataFromServer(endPoint).subscribe(
      (res: any) => {
        console.log('category', res);
        if (
          res != null &&
          res[0] != undefined &&
          res[0].products &&
          res[0].products.length > 0
        ) {
          this.productList = res[0].products[0].product_info.reco_list.products;
          this.productList.forEach((el: any) => {
            el['quantity'] = 0;
          });
          console.log('inside items', this.productList);
        } else {
          this.productList = [];
        }
      },
      () => {},
      () => {}
    );
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
      this.cart.addItemToCart(product);
    } else {
      alert('Please select the Quantity');
    }
  }
}

// export class Product {
//   productName!: string;
//   price!: number;
//   quantity!: number;
//   totalPrice!: number;
//   discount!: number;
//   selectedWeight!: string;
// }

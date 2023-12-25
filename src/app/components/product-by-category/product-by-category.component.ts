import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss'],
})
export class ProductByCategoryComponent implements OnInit {
  constructor(private http: HttpService) {}
  categoryList: any = [];
  productList: any = [];
  selectedCategory: string = '';

  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.http.getDataFromServer('topcats').subscribe((res: any) => {
      if (res && res.length > 0) {
        this.categoryList = res.map((obj: any) => obj.top_category.name);
        // this.categoryList = res;
        this.categoryList.unshift('ALL');
        console.log('get category', this.categoryList);
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
          console.log('inside items', this.productList);
        } else {
          this.productList = [];
        }
      },
      () => {},
      () => {}
    );
  }
}

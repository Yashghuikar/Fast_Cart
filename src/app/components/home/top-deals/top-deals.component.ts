import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/core/services/http.service';

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
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.topDeals();
  }
  topDeals() {
    this.http.getDataFromServer('top-deals').subscribe(
      (res: any) => {
        this.topDealsLists = res.products;
        console.log('top-deals', this.topDealsLists);
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
}

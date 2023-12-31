import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Observable, Subscriber } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { CartService } from '../service/cart.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  cartCountObj!: Observable<number>;
  actionName: string = '';
  userDeatilsObj: any;
  searchParam: string = '';
  constructor(
    private log: LoginService,
    private shared: SharedService,
    private cart: CartService,
    private http: HttpService
  ) {}

  triggerAction(action: string) {
    this.actionName = action;
  }

  ngOnInit(): void {
    this.cartCountObj = this.shared.cartCountObs$;

    let userInfo = this.log.getUser();
    if (userInfo != null) {
      this.userDeatilsObj = userInfo;
      this.actionName === 'LOGIN_SUCCESS';
    }

    const data = this.cart.getCartData();
    if (data && data.length > 0) {
      this.shared.emitCardCount(data.length);
    }
  }

  getData(data: string) {
    this.actionName = data;
    console.log('viewchild', this.actionName);
    if (this.actionName === 'LOGIN_SUCCESS') {
      this.closePopup();
      this.userDeatilsObj = this.log.getUser();
      console.log('-----', this.userDeatilsObj.fullName);
    }
  }
  getRes(res: any) {
    this.actionName = res;
  }

  closePopup() {
    this.closeBtn.nativeElement.click();
  }

  logout() {
    this.actionName = '';
    localStorage.removeItem('userInfo');
  }

  searchProduct() {
    console.log('on change', this.searchParam);

    // const endPoint = 'products/productName=' + this.searchParam;
    const endPoint = 'products';

    this.http.getDataFromServer(endPoint).subscribe(
      (el: any) => {},
      (error) => {},
      () => {}
    );
  }
}

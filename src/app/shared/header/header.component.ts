import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { SharedService } from '../service/shared.service';

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

  constructor(private log: LoginService, private shared: SharedService) {}

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
}

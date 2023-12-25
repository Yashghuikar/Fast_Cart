import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  actionName: string = '';
  triggerAction(action: string) {
    this.actionName = action;
  }

  getData(data: string) {
    this.actionName = data;
  }
  getRes(res: any) {
    this.actionName = res;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [HeaderComponent, FooterComponent],

  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
})
export class SharedModule {}

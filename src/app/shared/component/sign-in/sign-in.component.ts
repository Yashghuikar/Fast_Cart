import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Output() emitAction: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private http: HttpService) {}

  signInForm!: FormGroup;
  isLoggedIn: boolean = true;

  signUp() {
    this.emitAction.emit('Sign-Up');
  }

  ngOnInit(): void {
    this.loginForm();
  }
  loginForm() {
    this.signInForm = this.fb.group({
      email: ['', []],
      password: ['', []],
    });
  }

  login() {
    console.log('login', this.signInForm.value);

    const endPoint =
      'users?email=' +
      this.signInForm.get('email')?.value +
      '&password=' +
      this.signInForm.get('password')?.value;
    this.http.getDataFromServer(endPoint).subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      },
      () => {},
      () => {}
    );
  }
}

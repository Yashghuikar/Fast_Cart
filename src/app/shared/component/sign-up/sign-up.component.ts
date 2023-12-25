import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() actionEmit: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) {}
  signUpForm!: FormGroup;
  generateOtp: boolean = false;
  otp!: number;

  sign_up() {
    this.actionEmit.emit('Sign-In');
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signUpForm = this.fb.group({
      fullName: ['', []],
      emailAddress: ['', []],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      password: ['', []],
    });
  }

  SignUp() {
    console.log('data from sign up', this.signUpForm.value);
    this.otp = Math.floor(100000 + Math.random() * 900000);
  }

  getOtp() {
    this.generateOtp = true;
  }

  verifyOtp() {
    this.generateOtp = false;
  }
}

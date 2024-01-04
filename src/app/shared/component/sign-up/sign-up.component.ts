import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output() actionEmit: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private http: HttpService) {}
  signUpForm!: FormGroup;
  generateOtp: boolean = false;
  otp!: number;
  otpTimer: number | undefined;
  sub!: Subscription;
  otpNotVerified: boolean = false;

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
      otpEntered: ['', []],
      otpVerified: ['false'],
    });
  }

  SignUp() {
    console.log('data from sign up', this.signUpForm.value);

    if (this.signUpForm.get('otpVerified')?.value) {
      this.http
        .postDataFromServer('users', this.signUpForm.value)
        .subscribe((res: any) => {
          console.log('sign up from ', res);
          alert('Registration successfull');
        });
    }
  }

  getOtp() {
    if (this.signUpForm.get('mobile')?.valid) {
      this.generateOtp = true;
      this.otp = Math.floor(100000 + Math.random() * 900000);
      console.log('otp', this.otp);
      this.sub = interval(1000).subscribe((res) => {
        if ((res && res < 31) || res == 0) {
          this.otpTimer = 30 - res;
        } else {
          this.sub.unsubscribe();
          this.generateOtp = false;
          this.otpTimer = undefined;
        }
      });
    }
  }

  verifyOtp() {
    if (this.otp == this.signUpForm.get('otpEntered')?.value) {
      this.generateOtp = false;
      this.sub.unsubscribe();
      this.otpTimer = undefined;
      this.otpNotVerified = false;
      this.signUpForm.get('otpVerified')?.setValue(true);
    } else {
      this.otpNotVerified = true;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

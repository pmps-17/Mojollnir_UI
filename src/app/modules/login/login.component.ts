import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userdata: any;
  authdata: any;
  hideOtp: boolean = true; // Initially hide the OTP field

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]), // Added email validation
    otp: this.fb.control('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6)
    ])
  });

  isEmailValid(): boolean {
    if (this.hideOtp) {
      return this.loginForm.get('email')?.valid || false;
    } else {
      return this.loginForm.get('otp')?.valid || false;
    }
  }
  

  // Handle email submission and show OTP input on success
  proceedlogin() {
    if (this.loginForm.get('email')?.valid) {
      this.service.GetbyCode({ email: this.loginForm.get('email')?.value }).subscribe(
        (res: any) => {
          this.userdata = res;
          console.log(this.userdata);
          if (this.userdata.success) {
            this.loginForm.get('otp')?.enable();
            this.loginForm.get('email')?.disable();
            this.toastr.success('Email verified successfully. Please enter OTP.');
            this.hideOtp = false; // Show the OTP field
          } else {
            this.toastr.error('Invalid email. Please try again.');
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error('An error occurred. Please try again later.');
        }
      );
    } else {
      this.toastr.error('Please enter a valid email.');
    }
  }

  // Handle OTP verification
  verifyOtp() {
    if (this.loginForm.get('otp')?.valid) {
      this.service.GetOtp({ email: this.loginForm.get('email')?.value, otp: this.loginForm.get('otp')?.value }).subscribe(
        (res: any) => {
          this.authdata = res;
          console.log(this.authdata);
          if (this.authdata.success) {
            this.toastr.success('OTP verified successfully.');
            sessionStorage.setItem('authToken', this.authdata.token);

            if (this.authdata.account_exists) {
              this.router.navigate(['dashboard'], {
                state: { token: this.authdata.token },
              });
            }else{
              this.router.navigate(['register'], {
                state: { token: this.authdata.token },
              });
            }

          } else {
            this.hideOtp = true;
            this.loginForm.get('otp')?.disable();
            this.loginForm.get('email')?.enable();
            this.toastr.error('Incorrect OTP. Please try again.');
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error('An error occurred. Please try again later.');
        }
      );
    } else {
      this.toastr.error('Please enter a valid OTP.');
    }
  }
}

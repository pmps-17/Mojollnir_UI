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
  hide: boolean = true;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) {
    sessionStorage.clear();
  }

  loginForm = this.fb.group({
    id: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginForm.valid) {
      this.service.GetbyCode(this.loginForm.value.id).subscribe(res => {
        this.userdata = res[0];
        console.log(this.userdata);
        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('id', this.userdata.id);
            sessionStorage.setItem('role', this.userdata.role);
            this.router.navigate(['dashboard']);
          } else {
            this.toastr.error("Please contact Admin", "Inactive user");
          }
        } else {
          this.toastr.error("Invalid Credentials")
        }
      })

    }
  }

}

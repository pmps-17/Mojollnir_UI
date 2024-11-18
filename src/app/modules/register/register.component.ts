import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router){

  }

  registrationForm = this.fb.group({
    id: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.fb.control('male'),
    role: this.fb.control(''),
    isactive: this.fb.control(false)
  });

  proceedregister() {
    if (this.registrationForm.valid) {
      this.service.Proceedregister(this.registrationForm.value).subscribe(result => {
        this.toastr.success('Please contact admin to Enable Access.','Registered Successfully.')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}

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

  authToken: string = '';
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.authToken = navigation?.extras.state?.['token'] || '';
  }

  registrationForm = this.fb.group({
    vid: this.fb.control(''), // vid is optional and defaults to an empty string
    full_name: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    password: this.fb.control('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    address: this.fb.control(''), // address is optional
    created_at: this.fb.control('') // will be set dynamically during submission
  });

  proceedregister() {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.value,
        created_at: new Date().toISOString() // Set created_at dynamically
      };

      this.service.Proceedregister(formData, this.authToken).subscribe(
        result => {
          this.toastr.success('Please contact admin to Enable Access.', 'Registered Successfully.');
          this.router.navigate(['login']);
        },
        error => {
          this.toastr.error('Registration failed. Please try again.');
        }
      );
    } else {
      this.toastr.warning('Please fill in all mandatory fields with valid data.');
    }
  }
}

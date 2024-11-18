import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  rolelist: any;
  editdata: any;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<PopupComponent>) { }

  ngOnInit(): void {
    this.service.getAllRole().subscribe(res => {
      this.rolelist = res;
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.GetbyCode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          password: this.editdata.password,
          email: this.editdata.email,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isactive: this.editdata.isactive
        })
      })
    }
  }

  registerform = this.fb.group({
    id: this.fb.control(''),
    name: this.fb.control(''),
    password: this.fb.control(''),
    email: this.fb.control(''),
    gender: this.fb.control('male'),
    role: this.fb.control('', Validators.required),
    isactive: this.fb.control(false)
  });

  // loaduserdata(code: any) {
  //   this.service.GetUserbyCode(code).subscribe(res => {
  //     this.editdata = res;
  //     console.log(this.editdata);
  //     this.registerform.setValue({
  //       id: this.editdata.id, name: this.editdata.name,
  //       password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
  //       role: this.editdata.role, isactive: this.editdata.isactive
  //     });
  //   });
  // }

  updateUser() {
    if (this.registerform.valid) {
      this.service.UpdateUser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this.toastr.success('Updated successfully.');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please Select Role')
    }
  }
}

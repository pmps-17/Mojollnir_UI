import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from 'src/app/layout/popup/popup.component';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit{
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  userList: any;
  dataSource: any;
  displayedColumns: string[] = ['username', 'name', 'email', 'status','role', 'action']

  constructor(private service: AuthService, 
    private dialog: MatDialog){
  }

  ngOnInit(): void {
      this.loadUser();
  }

  loadUser(){
    this.service.GetAll().subscribe(res =>{
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateUser(code: any){
    const popup = this.dialog.open(PopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadUser();
    })
  }

  openDialog(){
  }

}

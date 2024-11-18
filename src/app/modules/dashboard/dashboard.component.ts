import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeCard } from '../../shared/interface/bike-card';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bikeCard = [
    { id: 1, name: "Manual", price: 100, topSpeed: 25, available: 10, image: '../../../assets/images/bicycle.svg', count: 0, hours: 1 },
    { id: 2, name: "Single Electric", price: 150, topSpeed: 30, available: 15, image: '../../../assets/images/bicycle.svg', count: 0, hours: 1 },
    { id: 3, name: "Double Electric", price: 200, topSpeed: 35, available: 8, image: '../../../assets/images/bicycle.svg', count: 0, hours: 1 },
  ];
  timeSlots: string[] = [];
  dashBoardForm: FormGroup;

  constructor(private utilityService: UtilityService,
    private fb: FormBuilder) {  }

  ngOnInit() {
    this.createDashBoardForm();
    this.timeSlots = this.utilityService.generateTimeSlots();
  }

  increaseCount(bike: BikeCard) {
    if (bike.count < bike.available) {
      bike.count++;
    }
  }

  decreaseCount(bike: BikeCard) {
    if (bike.count > 0) {
      bike.count--;
    }
  }

  getTotalCycles(): number {
    return this.bikeCard.reduce((total, bike) => total + bike.count, 0);
  }

  createDashBoardForm() {
    this.dashBoardForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      timeSlot: this.fb.array([]),
    })
  }

  get phoneNumber() {
    return this.dashBoardForm.get('phoneNumber');
  }

  get phoneNumberErrors() {
    return this.phoneNumber?.errors;
  }

  calculateTotalPrice(): number {
    return this.bikeCard.reduce((total, bike) => total + (bike.count * bike.price * bike.hours), 0);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  summaryDetails = [
    { type: 'Manual Cycles', cycles: '1 Cycles', time: '2 Hrs', price: 200 },
    { type: 'Single Electric', cycles: '1 Cycles', time: '1 Hrs', price: 150 },
    { type: 'Double Electric', cycles: '2 Cycles', time: '1 Hrs', price: 400 },
  ];

  totalUsage: number = 750; // Sum of all cycle prices
  paidAmount: number = 150;
  securityDeposit: number = 500;

  refundableAmount: number = 0;
  collectionAmount: number = 0;

  ngOnInit() {
    this.calculateAmounts();
  }

  calculateAmounts() {
    const totalPaid = this.paidAmount + this.securityDeposit;
    this.refundableAmount = totalPaid > this.totalUsage ? totalPaid - this.totalUsage : 0;
    this.collectionAmount = this.totalUsage > totalPaid ? this.totalUsage - totalPaid : 0;
  }

}

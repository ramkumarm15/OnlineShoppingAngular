import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateBillingComponent} from "./create-billing/create-billing.component";
import {BillingAddressService} from "../../../../Service/billing-address.service";
import {BillingAddress} from "../../../../Model/billing-address";
import {UpdateBillingComponent} from "./update-billing/update-billing.component";
import {DeleteBillingComponent} from "./delete-billing/delete-billing.component";

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  data!: BillingAddress[];

  constructor(
    private dialog: MatDialog,
    private service: BillingAddressService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getBillingAddress().subscribe({
      next: (response: BillingAddress[]) => {
        console.log(response)
        this.data = response;
      }
    })
  }

  openDialog(comp: string, id: number = 0) {
    if (comp === 'create') {
      const dialogRef = this.dialog.open(CreateBillingComponent);

      dialogRef.afterClosed().subscribe(res => {
        console.log(res)
        this.getData();
      })
    } else if (comp === 'update') {
      const dialogRef = this.dialog.open(UpdateBillingComponent, {
        data: {
          id
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res)
        this.getData();
      })
    } else if (comp === 'delete') {
      const dialogRef = this.dialog.open(DeleteBillingComponent, {
        data: {
          id
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        console.log(res)
        this.getData();
      })
    }
  }

}

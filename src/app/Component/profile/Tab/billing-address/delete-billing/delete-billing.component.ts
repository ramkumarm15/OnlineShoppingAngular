import {Component, Inject, OnInit} from '@angular/core';
import {BillingAddressService} from "../../../../../Service/billing-address.service";
import {NotifyService} from "../../../../../Service/notify.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-billing',
  templateUrl: './delete-billing.component.html',
  styleUrls: ['./delete-billing.component.css']
})
export class DeleteBillingComponent implements OnInit {

  constructor(
    private service: BillingAddressService,
    private notify: NotifyService,
    public dialogRef: MatDialogRef<DeleteBillingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.service.deleteBillingAddress(this.data.id).subscribe({
      next: (response: any) => {
        this.notify.success(response.message);
        this.onCancel();
      },
      error: (err: HttpErrorResponse) => {
        this.notify.error(err.error.message)
      }
    })
  }
}

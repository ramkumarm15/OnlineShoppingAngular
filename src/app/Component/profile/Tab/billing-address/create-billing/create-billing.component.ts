import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BillingAddressService} from "../../../../../Service/billing-address.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {duration, Notify} from "../../../../../Model/notify";
import {NotificationComponent} from "../../../../../shared/notification/notification.component";
import {NotifyService} from "../../../../../Service/notify.service";

@Component({
  selector: 'app-create-billing',
  templateUrl: './create-billing.component.html',
  styleUrls: ['./create-billing.component.css']
})
export class CreateBillingComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: BillingAddressService,
    private dialogRef: MatDialogRef<CreateBillingComponent>,
    private notify: NotifyService
  ) {
  }

  createBillingForm = this.fb.group({
    billingName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
  })

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.createBillingForm.value)
    if (this.createBillingForm.valid) {
      this.service.createBillingAddress(this.createBillingForm.value).subscribe({
        next: (response: BillingResponse) => {
          console.log(response);
          this.notify.success(response.message);
          this.onCancel();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notify.error(err.error.message)
        }
      })
    }
  }

}

interface BillingResponse {
  message: string
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BillingAddressService} from "../../../../../Service/billing-address.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillingAddress} from "../../../../../Model/billing-address";
import {NotifyService} from "../../../../../Service/notify.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-billing',
  templateUrl: './update-billing.component.html',
  styleUrls: ['./update-billing.component.css']
})
export class UpdateBillingComponent implements OnInit {

  address!: BillingAddress;

  constructor(
    private fb: FormBuilder,
    private service: BillingAddressService,
    private notify: NotifyService,
    public dialogRef: MatDialogRef<UpdateBillingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.service.getBillingAddressById(this.data.id).subscribe({
      next: (response: BillingAddress) => {
        this.address = response;
        this.setFormData();
      },
      error: (err: HttpErrorResponse) => {
        this.notify.error(err.error.message);
        this.onCancel();
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateBillingForm = this.fb.group({
    billingName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  })

  setFormData() {
    this.updateBillingForm.get('billingName')?.setValue(this.address.billingName);
    this.updateBillingForm.get('address1')?.setValue(this.address.address1);
    this.updateBillingForm.get('address2')?.setValue(this.address.address2);
    this.updateBillingForm.get('city')?.setValue(this.address.city);
    this.updateBillingForm.get('state')?.setValue(this.address.state);
    this.updateBillingForm.get('postalCode')?.setValue(this.address.postalCode);
    this.updateBillingForm.get('mobileNumber')?.setValue(this.address.mobileNumber);
  }

  onSubmit() {
    if (this.updateBillingForm.valid) {
      this.service.updateBillingAddress(this.data.id, this.updateBillingForm.value).subscribe({
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

}

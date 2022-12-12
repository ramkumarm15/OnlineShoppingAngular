import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-billing',
  templateUrl: './create-billing.component.html',
  styleUrls: ['./create-billing.component.css']
})
export class CreateBillingComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
  }

  createBillingForm = this.fb.group({
    billingName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  })

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.createBillingForm.value)
  }

}

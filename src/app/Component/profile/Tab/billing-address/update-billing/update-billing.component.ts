import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-billing',
  templateUrl: './update-billing.component.html',
  styleUrls: ['./update-billing.component.css']
})
export class UpdateBillingComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
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

}

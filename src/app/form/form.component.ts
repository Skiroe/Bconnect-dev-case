import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {


  companyNameValidator= new FormControl('', [Validators.required]);
  telephoneNumberValidator = new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/)]);
  employeesValidator = new FormControl('', [Validators.required]);
  cocNumberValidator = new FormControl('', [Validators.required]);
  vatNumberValidator = new FormControl('', [Validators.required]);
  ibanNumberValidator = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9A-Z]{16}$/)]);
  descriptionValidator = new FormControl('', [Validators.required, Validators.maxLength(1000)]);

  companyName = '';
  telephoneNumber = '';
  employees = '';
  cocNumber = '';
  vatNumber = '';
  ibanNumber = '';
  budget = '';
  description = '';
  numberOfEmployees = ['1-10', '11-20', '21-50', '51-300', '300+'];

  constructor() {}

  save(): void {

    let form = new FormGroup({
      companyName: this.companyNameValidator,
      telephoneNumber: this.telephoneNumberValidator,
      employees: this.employeesValidator,
      cocNumber: this.cocNumberValidator,
      vatNumber: this.vatNumberValidator,
      ibanNumber: this.ibanNumberValidator,
      description: this.descriptionValidator
    })

    if (!form.valid)  {

      return;
    }

    let body: Object = {
      companyName: this.companyName,
      telephoneNumber: this.telephoneNumber,
      employees: this.employees,
      cocNumber: this.cocNumber,
      vatNumber: this.vatNumber,
      ibanNumber: this.ibanNumber,
      budget: this.budget,
      description: this.description
    }

    let request:Object = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    console.log("Form Submitted! See request below")
    console.log(body)
    console.log(request);
  }


}

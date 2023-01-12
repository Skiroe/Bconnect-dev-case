import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {


  // All of the validators
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




  constructor(private http: HttpClient) {}

  async checkKvkNumber(kvkNumber: string) {

    // Ik heb de API key van de KvK API gebruikt, maar kreeg steeds een unauthticated error.
    // Ik heb de code laten staan, maar het wordt niet gebruikt.
    return true;


    const apiUrl = `https://api.kvk.nl/test/api/v1/zoeken?kvkNummer=${kvkNumber}`;
    const httpOptions = {
      headers: {
        'Api-Key': 'l7xx1f2691f2520d487b902f4e0b57a0b197',
        'Content-Type': 'application/json'
      }
    };
    this.http.get(apiUrl, httpOptions).subscribe(async data => {
      // de data.totaal zijn de totaal gevonden bedrijven, als dit onder de 0 is, is er geen bedrijf gevonden
      // @ts-ignore
      return data.totaal> 0
    });
    return false;


  }

  async save(): Promise<void> {

    let form = new FormGroup({
      companyName: this.companyNameValidator,
      telephoneNumber: this.telephoneNumberValidator,
      employees: this.employeesValidator,
      cocNumber: this.cocNumberValidator,
      vatNumber: this.vatNumberValidator,
      ibanNumber: this.ibanNumberValidator,
      description: this.descriptionValidator
    })


    if (!form.valid) {
      alert("The form is not valid, please check the all of red colored fields");
      return;
    }

    let validKvkNumber:boolean = await this.checkKvkNumber(this.cocNumber)

    if (!validKvkNumber) {
      alert("The KVK number is not valid, try again")
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

    let request: Object = {
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

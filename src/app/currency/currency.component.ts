import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns'
import { ChangeCurrencyService } from '../services/change-currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  date = format(new Date(), 'MM/dd/yyyy')
  currencys : any[] = [];
  currencysValues : string[] = []

  formData!: FormGroup
  currentCurrency: any
  currencytem: any
  precie: any

  constructor(private currencyService: ChangeCurrencyService, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.formData = this.fb.group({
      firstvalue: [1],
      currencySelected: ['COP'],
      date: [this.date]
    })
    this.getAllCurrency();
    this.setValues();
    this.getCurrency()
  }

  getAllCurrency(){
    this.currencyService.getallCurrency().subscribe((resp: any) => {
      this.currencys = resp.symbols
      this.currencysValues = Object.keys(this.currencys);
    })
  }

  setValues(){
    this.formData.get('firstvalue')?.valueChanges.subscribe(resp =>  this.getCurrency())
    this.formData.get('currencySelected')?.valueChanges.subscribe(resp =>  this.getCurrency())
    this.formData.get('date')?.valueChanges.subscribe(resp =>  this.getdateCurrency());
  }

  getCurrency() {
    this.currencyService.getConvertCurrency().subscribe((resp: any) => {
         Object.keys(resp.rates).forEach( element => {
           if(this.formData.get('currencySelected')?.value == element){
              this.precie = resp.rates[element] * Number(this.formData.get('firstvalue')?.value)
           }
         })
    })
  }

  getdateCurrency(){
     this.currencyService.getDateCurrency(this.formData.get('date')?.value).subscribe((resp: any) => {
         Object.keys(resp.rates).forEach( element => {
           if(this.formData.get('currencySelected')?.value == element){
              this.precie = resp.rates[element] * Number(this.formData.get('firstvalue')?.value)
           }
         })
    })
  }

}

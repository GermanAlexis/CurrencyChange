import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base
const access_key = environment.access_key

@Injectable({
  providedIn: 'root'
})
export class ChangeCurrencyService {

  constructor( private http: HttpClient) { }

  getallCurrency(){
    return this.http.get(`${url_base}/symbols?access_key=${access_key}`)
  }

  getConvertCurrency(){
    return this.http.get(`${url_base}/latest?access_key=${access_key}`)
  }

  getDateCurrency(date: string){
    return this.http.get(`${url_base}/${date}?access_key=${access_key}`)

  }
}

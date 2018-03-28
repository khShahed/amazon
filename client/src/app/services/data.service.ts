import { Injectable } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {RestApiService} from "./rest-api.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class DataService{
  user: any;
  message = '';
  messageType = 'danger';

  constructor(
    private rest: RestApiService,
    private toastr: ToastrService
  ) {

  }

  async getProfile(){
    try {
      if (localStorage.getItem('token')){
        const data = await this.rest.get('api/accounts/profile');
        this.user = data['user'];
      }
    } catch(error){
      this.toastr.error(error, "Error");
    }
  }
}

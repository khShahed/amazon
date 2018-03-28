import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {RestApiService} from "../services/rest-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  rePassword = '';
  isSeller = false;

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
  }

  async register(){
    if (this.password !== this.rePassword){
      this.toastr.error("Password and Confirm password isn't matching", "Error")
      return;
    }
    if(this.password.length <= 6 || this.name.length <4){

    }
    const data = await this.rest.post('http://localhost:3000/api/accounts/signup',
      {
        name: this.name,
        email: this.email,
        password: this.password,
        isSeller : this.isSeller
      });
    if(data['success']){
      // localStorage.setItem('token', data['token']);
      this.toastr.success(data['message'], "Success");
      this.router.navigate(['/login'])
    }
    else{
      this.toastr.error(data['message'], "Error");
    }
  }
}

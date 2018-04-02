import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {RestApiService} from "../services/rest-api.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private toastr: ToastrService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.rest.get(`api/products/${params.id}`)
        .then(data => {
          data['success'] ?
            (this.product = data['product'])
            : this.router.navigate(['/']);
        })
        .catch(error=>{
          this.toastr.error(error, 'Error');
          this._location.back();
        });
    });
  }

}

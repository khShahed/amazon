import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  searchTerm = '';
  isCollapsed = true;

  constructor(private toastr: ToastrService){
  }
  ngOnInit(){
    this.toastr.success("Success message", "Success", {closeButton:true, progressBar:true});
    this.toastr.error("Error message", "Error", {closeButton:true, progressBar:true});
    this.toastr.info("Info message", "Info", {closeButton:true, progressBar:true});
    this.toastr.warning("Warning message", "Warning", {closeButton:true, progressBar:true});
  }
  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {

  }

  search() {

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  foodleSite: string = "https://foodle-app-ope.web.app/home";

  navbarLinks = [
    {label: "Create", routerLink: "create"},
    {label: "Read", routerLink: "read"},
    {label: "Update", routerLink: "update"},
    {label: "Delete", routerLink: "delete"},
  ];


  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../models/foodDB.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  tableData: Food[];
  inputName: string;

  constructor(public database: Database) {
    this.tableData = FoodDB.getAllFoods(this.database);
    this.inputName = "";
   }

  ngOnInit(): void {
  }

  filterName(): void{
    this.tableData = this.tableData.filter((v: Food, i: number) => v.name.includes(this.inputName.toLowerCase().trim()));
  }

}

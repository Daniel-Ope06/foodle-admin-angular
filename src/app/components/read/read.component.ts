import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  tableData: Food[];
  filterName: string;

  constructor(public database: Database) {
    this.tableData = FoodDB.getAllFoods(this.database);
    this.filterName = "";
    console.log("tableData:");
    console.log(this.tableData);
   }

  ngOnInit(): void {
  }

  isValidName(): boolean{
    if ((this.filterName != null) && (this.filterName.replace(/\s+/g, ' ').trim().length > 0) && (this.filterName.replace(/\s+/g, ' ').trim() !== ' ')){
      return true;
    }
    return false;
  }

  filterNameMethod(): void{
    this.tableData = this.tableData.filter((v: Food, i: number) => v.name.includes(this.filterName.toLowerCase().trim()));
  }

  filterFoodByName(){
    if (this.isValidName()){
      this.tableData = FoodDB.filterFoodByName(this.database, this.filterName);
    }
    else{
      console.log('d')
    }
  }
}

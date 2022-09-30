import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: Food[];

  constructor(public database: Database) { 
    this.tableData = FoodDB.getAllFoods(this.database);
  }

  ngOnInit(): void {
  }

  reloadTable(): void{
    this.tableData = FoodDB.getAllFoods(this.database);
  }

  deleteFood(foodName: string): void{
    // remove from tableData & screen
    this.tableData = this.tableData.filter((v: Food, i: number) => v.name !== foodName);

    // remove from firebase
    FoodDB.deleteFromFoodDB(this.database, foodName);
  }
}

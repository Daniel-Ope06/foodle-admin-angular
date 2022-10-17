import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: Food[];

  constructor(public database: Database, public dialog: MatDialog) { 
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

  openDeleteDialog(foodName: string, foodCategory: string, foodCost: number): void{
    this.dialog.open(DeleteDialogComponent, {
      data:{name: foodName, category: foodCategory, cost: foodCost},
      width: '500px',
    });
  }
}

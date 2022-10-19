import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
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

  openEditDialog(foodName: string, foodCategory: string, foodCost: number): void{
    const editDialog = this.dialog.open(EditDialogComponent, {
      data:{name: this.capsFirstLetter(foodName), category: this.capsFirstLetter(foodCategory), cost: foodCost},
    });
  }

  openDeleteDialog(foodName: string, foodCategory: string, foodCost: number): void{
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data:{name: this.capsFirstLetter(foodName), category: this.capsFirstLetter(foodCategory), cost: foodCost},
      //phrase.charAt(0).toUpperCase() + phrase.slice(1)
    });
    deleteDialog.afterClosed().subscribe(response =>{
      if (response == 1){
        this.deleteFood(foodName);
      }
    })
  }


  capsFirstLetter(word: string): string{
    return (word.charAt(0).toUpperCase() + word.slice(1));
  } 
}

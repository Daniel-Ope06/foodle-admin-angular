import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  menu: Food[];
  food: Food;
  inputName: string;
  inputCategory: string;
  inputCost: number;
  defualtCost: number = 9.99;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Food, public database: Database) {
    this.menu = FoodDB.getAllFoods(this.database);
    this.food = {name: "", category: "", cost: this.defualtCost};
    this.inputName = data.name;
    this.inputCategory = data.category;
    this.inputCost = data.cost;
  }

  ngOnInit(): void {
  }

  initializeFood(): void{
    this.food = {
      name:this.inputName.toLowerCase(),
      category: this.inputCategory,
      cost : this.inputCost
    }
  }

  closeDialog(response: number): void{
    this.dialogRef.close({
      response: response,
      newName: this.inputName,
      newCategory: this.inputCategory,
      newCost: this.inputCost
    });
  }
}

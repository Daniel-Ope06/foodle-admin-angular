import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from 'src/app/models/food.model';
import { FoodDB } from 'src/app/services/foodDB.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  inputName: string;
  inputCategory: string;
  inputCost: number;
  inputDescription: string
  menu: Food[];

  constructor(public database: Database) {
    this.inputName = "";
    this.inputCategory = "";
    this.inputCost = 0.01;
    this.inputDescription = "";
    this.menu = FoodDB.getAllFoods(this.database);
  }

  ngOnInit(): void {
  }


  isInputValid(): boolean{
    if (this.inputName.length == 0){
      alert("Field is empty");
      return false;
    }

    let names: string[] = [];
    this.menu.forEach(element => {
      names.push(element.name);
    });

    let index = names.indexOf(this.inputName.replace(/\s+/g, ' ').trim()); // remove excess spaces from input
    if (index == -1){
      alert("Food does not exist");
      return false;
    }
    return true;
  }

  deleteFood(): void{
    if (this.isInputValid()){
      FoodDB.deleteFromFoodDB(this.database, this.inputName);
      this.inputName = "";
    }
  }
}

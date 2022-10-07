import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Food } from '../../models/food.model';
import { FoodDB } from '../../services/foodDB.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  menu: Food[];
  food: Food;
  inputName: string;
  inputCategory: string;
  inputCost: number;
  defualtCost: number = 9.99;
 
  constructor(public database: Database) {
    this.menu = FoodDB.getAllFoods(this.database);
    this.food = {name: "", category: "", cost: this.defualtCost};
    this.inputName = "";
    this.inputCategory = "";
    this.inputCost = this.defualtCost;
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

  isValid(): boolean{
    if ((this.inputName.length > 0) && (this.inputCategory.length > 0)){
      return true;
    }
    return false;
  }

  resetForm(): void{
    this.inputName = "";
    this.inputCategory = "";
    this.inputCost = this.defualtCost;
  }

  addFood(): void{
    if (this.isValid()){
      this.initializeFood();

      // add to menu array
      this.menu.push(this.food);

      // add to firebase
      FoodDB.addToFoodDB(this.database, this.food);

      alert("Food added successfully")
      this.resetForm();
    }
    else{
      alert("Fill all fields");
    }
  }
}

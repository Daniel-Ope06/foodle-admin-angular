import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, ref, get, set, update, remove } from '@angular/fire/database';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  menu: Food[];
  inputName: string;
  inputCategory: string;
  inputCost: number;
  inputDescription: string;

  constructor(public database: Database) {
    this.menu = CreateComponent.getAllFoods(this.database);
    this.inputName = "";
    this.inputCategory = "";
    this.inputCost = 0.01;
    this.inputDescription = "";
  }

  ngOnInit(): void {
  }

  addFood(): void{
    if (CreateComponent.isValid(this.inputName, this.inputCategory, this.inputCost, this.inputDescription)){
      // add to menu array
      this.menu.push(
        {
          name:this.inputName,
          category: this.inputCategory,
          cost : this.inputCost,
          description: this.inputDescription
        }
      );

      // add to firebase
      set(ref(this.database, 'menu/food_' + this.menu.length.toString()), {
        name:this.inputName,
        category: this.inputCategory,
        cost : this.inputCost,
        description: this.inputDescription
      });

      // reset form
      this.inputName = "";
      this.inputCategory = "";
      this.inputCost = 0;
      this.inputDescription = "";

      alert("Food added successfully")
    }
    else{
      alert("Fill all fields");
    }
  }


  private static getAllFoods(db: Database): Food[]{
    let arr: Food[] = [];
    get(ref(db, 'menu')).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(element =>{
          arr.push(element.val());
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return arr;
  }

  private static isValid(name: string, category: string, cost: number, description: string): boolean{
    if ((name.length > 0) && (description.length > 0) && (category.length > 1)){
      return true;
    }
    return false;
  }
}

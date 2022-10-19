import { Database, ref, get, set, update, remove, query, orderByChild } from '@angular/fire/database';
import { Food } from '../models/food.model';

export class FoodDB{
    public static getAllFoods(db: Database): Food[]{
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

    public static hashFoodName(name: string): string{
        // remove excess spaces and replace with underscores
        return (name.toLowerCase().replace(/\s+/g, ' ').trim().replace(/ /g, "_"));
    }

    public static addToFoodDB(db: Database, food: Food): void{
        const foodID: string = this.hashFoodName(food.name);
        set(ref(db, `menu/${foodID}`), {
            name: food.name,
            category: food.category,
            cost : food.cost,
          });
    }

    public static filterFoodByName(db: Database, filterName: string): Food[]{
      let arr: Food[] = [];
      const searchName: string = filterName.replace(/\s+/g, ' ').trim().toLowerCase();
      get(ref(db, 'menu')).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(element =>{
            if (element.val().name.includes(searchName)){
              arr.push(element.val());
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.log(error);
      });
      return arr;
    }

    public static filterFoodByCategory(db: Database, category: string): Food[]{
      let arr: Food[] = [];
      get(ref(db, 'menu')).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(element =>{
            if (element.val().category === category){
              arr.push(element.val());
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.log(error);
      });
      return arr;
    }

    public static deleteFromFoodDB(db: Database, name: string): void{
        const foodID: string = this.hashFoodName(name);
        remove(ref(db, `menu/${foodID}`))
        .then(() =>{
          console.log("Food deleted");
        })
        .catch((error) => {
          console.log("Unable to delete");
        });
    }
}
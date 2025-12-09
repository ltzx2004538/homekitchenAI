export interface Recipe {
  name: string;
  ingredients: string[];
  steps: string[];
  customIngredients?: string[];
  customInstructions?: string[];
}

export interface RecipeDB extends Recipe {
  _id?: any; // MongoDB ObjectId
  createdBy: any; // MongoDB ObjectId, foreign key to User
  kitchenId?: any; // MongoDB ObjectId, foreign key to Kitchen
}

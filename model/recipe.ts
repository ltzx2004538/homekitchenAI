export interface Recipe {
  _id?: any; // MongoDB ObjectId
  name: string;
  createdBy: any; // MongoDB ObjectId, foreign key to User
  ingredients: string[];
  steps: string[];
  customIngredients?: string[];
  customInstructions?: string[];
}

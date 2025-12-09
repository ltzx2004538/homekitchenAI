export interface User {
  _id?: any; // MongoDB ObjectId
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
  kitchenId: any; // MongoDB ObjectId, foreign key to Kitchen
}

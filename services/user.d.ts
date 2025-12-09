declare const userService: {
  createUserService(user: { firstname: string; lastname: string; email: string; password: string }): Promise<import("../model/user").User>;
  getUserByEmailService(email: string): Promise<import("../model/user").User | null>;
};
export default userService;

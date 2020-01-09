export interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  state: string;
}

export class User implements IUser{
  userId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  state: string;

}

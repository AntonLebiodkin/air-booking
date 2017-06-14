export class User {
  _id: string;

  email: string;
  password: string;

  firstName: string;
  lastName: string;
  birthDate: Date;

  permissions: Array<string>;
  money: number;
}

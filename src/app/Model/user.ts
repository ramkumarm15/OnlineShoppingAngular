export class User {
  id: number = 0;
  username: string = '';
  name: string = '';
  emailAddress: string = '';
  about: string = "";
  city: string = "";
}

export interface UserResponse {
  status: number,
  message: string
}

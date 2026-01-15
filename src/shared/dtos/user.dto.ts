export class CreateUserDto {
  username: string;
  mobile: string;
  email: string;
  password: string;
  status: number;
  is_super: boolean;
  sort: number;
}

export class UpdateUserDto extends CreateUserDto {
  id: number;
}

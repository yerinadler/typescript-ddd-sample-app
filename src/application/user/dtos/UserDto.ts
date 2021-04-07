export class UserDto {
  constructor(
    public guid: string,
    public email: string,
    public firstname: string,
    public lastname: string,
  ) {}
}
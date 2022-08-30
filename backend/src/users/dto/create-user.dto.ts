import { IsDate, IsEmail, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsOptional()
  public id: string;

  @IsEmail()
  public email: string;

  @IsDate()
  @IsOptional()
  public createdAt: string;

  @IsDate()
  @IsOptional()
  public updatedAt: string;

  @IsString()
  @IsOptional()
  public firstname: string;

  @IsString()
  @IsOptional()
  public lastname: string;

  @IsString()
  @IsOptional()
  public roleId: string;
}

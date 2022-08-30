import { IsString, IsOptional } from 'class-validator';

export class GetQueryProducts {
  @IsString()
  @IsOptional()
  public tag: string;

  @IsString()
  @IsOptional()
  public search: string;
}

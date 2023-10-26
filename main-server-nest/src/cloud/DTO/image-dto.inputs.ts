import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateImageInput {
  @IsNotEmpty()
  @IsString()
  dir: string;

  @IsOptional()
  @Min(50)
  @Max(2000)
  w?: number;

  @IsOptional()
  @Min(50)
  @Max(2000)
  h?: number;
}

export class ChangeImageInput extends CreateImageInput {
  @IsNotEmpty()
  @IsString()
  path: string;
}



import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
  IsPositive,
} from 'class-validator';
import { Status } from './status-prospect.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProspectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly zipcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly rfc: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly notes: string;

  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty()
  readonly status: Status;
}

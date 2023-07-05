import {
  IsString,
  IsPositive,
  IsOptional,
  Min,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { SortBy, SortType } from './sort-prospect.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class FilterProspectDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsEnum(SortBy)
  @IsOptional()
  @ApiProperty()
  readonly sortBy: SortBy;

  @IsEnum(SortType)
  @IsOptional()
  @ApiProperty()
  readonly sortType: SortType;
}

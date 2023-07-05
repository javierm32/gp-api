import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDoc {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ext: string;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { FilterProspectDto } from './dto/filter-prospect.dto';
import { UploadDoc } from './dto/upload-doc.dto';

@Controller('prospects')
export class ProspectsController {
  constructor(private readonly prospectsService: ProspectsService) {}

  @Post()
  create(@Body() createProspectDto: CreateProspectDto) {
    return this.prospectsService.create(createProspectDto);
  }

  @Post('upload-file/:id')
  uploadImage(@Param('id') id: string, @Body() uploadDoc: UploadDoc) {
    return this.prospectsService.uploadFile(+id, uploadDoc);
  }

  @Get('get-file/:filename')
  getFile(@Param('filename') filename: string) {
    return this.prospectsService.getFile(filename);
  }

  @Get()
  findAll(@Query() params?: FilterProspectDto) {
    return this.prospectsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prospectsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProspectDto: UpdateProspectDto,
  ) {
    return this.prospectsService.update(+id, updateProspectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prospectsService.remove(+id);
  }
}

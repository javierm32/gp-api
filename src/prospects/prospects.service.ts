import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Prospect } from './entities/prospect.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterProspectDto } from './dto/filter-prospect.dto';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { UploadDoc } from './dto/upload-doc.dto';

@Injectable()
export class ProspectsService {
  constructor(
    @InjectRepository(Prospect) private prospectRepo: Repository<Prospect>,
    private readonly configService: ConfigService,
  ) {}

  bucket = this.configService.get<string>('AWS_BUCKET_NAME');
  region = this.configService.get<string>('AWS_BUCKET_REGION');
  accessKeyId = this.configService.get<string>('AWS_PUBLIC_KEY');
  secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');

  s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: this.accessKeyId,
    secretAccessKey: this.secretAccessKey,
    region: this.region,
    signatureVersion: 'v4',
  });

  async create(createProspectDto: CreateProspectDto) {
    const newProspect = await this.prospectRepo.create(createProspectDto);
    const prospect = await this.prospectRepo.save(newProspect);

    return prospect;
  }

  async uploadFile(id: number, uploadDoc: UploadDoc) {
    const key = `${uuidv4()}.${uploadDoc.ext}`;

    const params = {
      Bucket: this.bucket,
      ContentType: '*/*',
      Key: key,
      Expires: 60,
    };

    const prospect = await this.prospectRepo.findOneBy({ id });
    if (!prospect) {
      throw new NotFoundException(`Prospect not found.`);
    }

    prospect.documentRef = key;
    this.prospectRepo.save(prospect);

    const url = await this.s3.getSignedUrl('putObject', params);
    return { url, key };
  }

  async getFile(filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
      Expires: 3600,
    };

    try {
      const signedUrl = await this.s3.getSignedUrlPromise('getObject', params);
      return signedUrl;
    } catch (error) {
      console.log('Error generating pre-signed URL:', error);
      throw error;
    }
  }

  async findAll(params: FilterProspectDto) {
    const { limit, offset, sortBy, sortType } = params;

    const query = await this.prospectRepo.createQueryBuilder('prospects');

    if (sortBy && sortType) {
      query.orderBy(`prospects.${sortBy}`, sortType);
    }

    const total = await query.getCount();
    const prospects = await query.take(limit).skip(offset).getMany();
    return { total: total, data: prospects };
  }

  async findOne(id: number) {
    const prospect = await this.prospectRepo.findOneBy({ id });
    if (!prospect) {
      throw new NotFoundException(`Prospect not found.`);
    }

    return prospect;
  }

  async update(id: number, updateProspectDto: UpdateProspectDto) {
    const prospect = await this.prospectRepo.findOneBy({ id });
    if (!prospect) {
      throw new NotFoundException(`Prospect not found.`);
    }

    this.prospectRepo.merge(prospect, updateProspectDto);

    return this.prospectRepo.save(prospect);
  }

  remove(id: number) {
    return this.prospectRepo.softDelete(id);
  }
}

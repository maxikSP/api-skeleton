import { Buffer } from 'buffer';
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    name: 'file',
    description: 'Uploaded file buffer.',
    type: () => 'file',
    required: true,
  })
  public file: Buffer;
}

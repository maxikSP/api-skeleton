import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { File } from '@module/media/entity/file';
import { FileService } from '@module/media/service/file.service';
import { FileContext } from '@module/media/constant/context.enum';
import { FileInterceptor, File as FileInfo } from '@nest-lab/fastify-multer';
import { FileUploadDto } from '@module/media/dto/file.upload.dto';
import { JwtGuard } from '@module/security/guard/jwt.guard';

@ApiTags('Files')
@ApiBearerAuth('jwt')
@Controller('files')
export class UploadController {
  constructor(public service: FileService) {}

  @Post(':context')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'context',
    type: 'string',
    enum: ['avatar'],
    required: true,
  })
  @ApiBody({
    type: FileUploadDto,
    required: true,
    description: 'File to upload',
  })
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  public upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15e6 }),
          new FileTypeValidator({ fileType: /.*(.jpg|.jpeg|.png)$/ }),
        ],
      }),
    )
    file: FileInfo,
    @Param('context') context: FileContext,
  ): Promise<File> {
    return this.service.create(file, context);
  }
}

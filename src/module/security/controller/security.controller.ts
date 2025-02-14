import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SecurityDto } from '@module/security/dto/security.dto';
import { SecurityService } from '@module/security/service/security.service';
import { LocalGuard } from '@module/security/guard/local.guard';
import { User } from '@module/user/entity/user';

@ApiTags('Security')
@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('token')
  @ApiBody({ type: SecurityDto, description: 'Get JWT access token.' })
  @ApiResponse({ status: 201, description: 'Successful authentication.' })
  @ApiResponse({ status: 401, description: 'Authentication failed.' })
  @UseGuards(LocalGuard)
  public token(@Request() req: { user: User }): Promise<any> {
    return this.securityService.createToken(req.user);
  }
}

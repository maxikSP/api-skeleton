import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HttpHealthController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('liveness')
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      (): HealthIndicatorResult => ({
        nestjsApp: { status: 'up', time: new Date() },
      }),
    ]);
  }
}

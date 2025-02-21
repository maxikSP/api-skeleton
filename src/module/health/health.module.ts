import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpHealthController } from '@module/health/controller/http.health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HttpHealthController],
})
export class HealthModule {}

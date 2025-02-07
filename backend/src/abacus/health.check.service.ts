// backend/src/abacus/health-check.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AbacusHealthCheckService {
    private readonly logger = new Logger(AbacusHealthCheckService.name);

    constructor(private readonly httpService: HttpService) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    async keepAlive() {
        await this.pingDeployment(
            process.env.CUSTOMIZE_QUESTION_TOKEN,
            process.env.CUSTOMIZE_QUESTION_PROJECT,
            'question-customization',
        );
        await this.pingDeployment(
            process.env.CUSTOMIZE_OPTIONS_TOKEN,
            process.env.CUSTOMIZE_OPTIONS_PROJECT,
            'options-customization',
        );
    }

    private async pingDeployment(
        token: string,
        projectId: string,
        deploymentName: string,
    ) {
        try {
            const payload = {
                messages: [
                {
                    is_user: true,
                    text: 'health_check',
                },
                ],
                temperature: 0.0,
            };

            const response = await firstValueFrom(
                this.httpService.post(
                `https://pa002.abacus.ai/api/v0/getChatResponse?deploymentToken=${token}&deploymentId=${projectId}`,
                payload,
                { headers: { 'Content-Type': 'application/json' } },
                ),
            );

            this.logger.log(
                `Health check successful for ${deploymentName} deployment`,
            );
            console.log(`Health check successful for ${deploymentName} deployment`);
            return response.data;
        } catch (error) {
            this.logger.error(
                `Health check failed for ${deploymentName} deployment:`,
                error.message,
            );
        }
    }
}
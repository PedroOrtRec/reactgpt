import { Injectable } from '@nestjs/common';
import { OrthographyCheckUseCase, ProsConsDiscusserStreamUseCase, TranslateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';
import { ProsConsDiscusserUseCase } from './use-cases/pros-cons-discusser.use-case';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    // Solo va a llamar casos de uso

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await OrthographyCheckUseCase(this.openai, {
            prompt: orthographyDto.prompt,
        });
    }

    async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
        return await ProsConsDiscusserUseCase(this.openai, {
            prompt,
        });
    }

    async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
        return await ProsConsDiscusserStreamUseCase(this.openai, {
            prompt,
        });
    }

    async translate({ prompt, lang }: TranslateDto) {
        return await TranslateUseCase(this.openai, {
            prompt,
            lang,
        });
    }
}

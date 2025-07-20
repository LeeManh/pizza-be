import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoryProviders } from './categories.providers';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoryProviders],
})
export class CategoriesModule {}

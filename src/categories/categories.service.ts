import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CATEGORY_REPOSITORY } from './categories.providers';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create({
      ...createCategoryDto,
    });
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return {
      items: categories,
      meta: {
        page: 1,
        pages: 1,
        total: categories.length,
        limit: categories.length,
        hasNext: false,
        hasPrev: false,
      },
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    return category;
  }
}

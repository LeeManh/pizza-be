import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ResponseMessage } from 'src/commons/decorators/response-message.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ResponseMessage('Tạo danh mục thành công')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách danh mục thành công')
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin danh mục thành công')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }
}

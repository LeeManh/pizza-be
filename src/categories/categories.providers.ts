import { Category } from 'src/models/category.model';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
];

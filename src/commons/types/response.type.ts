import { HttpStatus } from '@nestjs/common';

export type SuccessResponse<T> = {
  statusCode: HttpStatus;
  message: string;
  data: T | T[];
  meta?: PaginationMeta;
};

export interface ErrorResponse<T = Record<string, string[]>> {
  statusCode: HttpStatus;
  message: string;
  errors?: T;
}

export interface PaginationMeta {
  page: number;
  pages: number;
  total: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface UnprocessableEntityResponse<T = Record<string, string[]>> {
  message: string;
  errors: T;
}

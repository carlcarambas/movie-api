import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  findMovie() {
    return {
      title: 'Test Title',
      genre: 'Comedy',
    };
  }

  createMovie() {
    return {
      success: true,
    };
  }
}

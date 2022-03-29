import {
  Res,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMovieDto } from 'src/models/create_movie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  getMovies() {
    return this.moviesService.findMovie();
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @Res() response: Response,
  ) {
    return this.moviesService.createMovie();
  }
}

import {
  Res,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { CreateMovieDto } from 'src/models/create_movie.dto';
import { MovieEntity } from 'src/models/movie.entity';
import { MovieI } from 'src/models/movie.interface';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiTags('Get All Movies')
  @ApiOkResponse({
    description: 'Returns the status of creating the new targets',
    type: MovieEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Required fields are empty',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occured while accessing firestore',
  })
  findAll(): Observable<MovieI[]> {
    return this.moviesService.findAll();
  }

  @Post()
  @ApiTags('Add Movie')
  @ApiOkResponse({
    description: 'Returns the status of creating the new targets',
    type: MovieEntity,
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occured while accessing firestore',
  })
  // @UsePipes(new ValidationPipe({ transform: true }))
  addMovie(@Body() movie: MovieI): Observable<MovieI> {
    return this.moviesService.addMovie(movie);
  }
}

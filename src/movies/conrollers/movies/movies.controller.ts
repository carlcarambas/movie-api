import {
  // Res,
  Body,
  Controller,
  Get,
  Post,
  // UsePipes,
  // ValidationPipe,
  HttpStatus,
  UseGuards,
  Request,
  Logger,
  Res,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { CreateMovieDto } from 'src/models/create_movie.dto';
import { MovieEntity } from '../../../models/movie.entity';
import { MovieI } from '../../../models/movie.interface';
import { MoviesService } from '../../services/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
  async addMovie(
    @Request() request,
    @Res() response: Response,
    @Body() movie: MovieI,
  ): Promise<MovieI | Response | object> {
    try {
      const newMovie = { createdBy: request.user.userId, ...movie };
      const created: MovieI = await this.moviesService.addMovie(
        newMovie,
        request.user,
      );
      return response.status(HttpStatus.OK).json(created);
    } catch (error) {
      Logger.error('Error adding Movie: ', error);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.toString() });
    }
  }
}

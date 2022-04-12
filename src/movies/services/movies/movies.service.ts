import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieEntity } from '../../../models/movie.entity';
import { MovieI } from '../../../models/movie.interface';
import { Repository } from 'typeorm';
import { UserI } from 'src/models/user.interface';
import { HttpService } from '@nestjs/axios';
import { Movie } from '../../../models/movie.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    private httpService: HttpService,
  ) {}

  async addMovie(movie: MovieI, user: UserI): Promise<MovieI> {
    let message = '';
    const additionalDetails: MovieI = new Movie();
    const moviesCreated = await this.findMoviesOfUser(user.userId);

    if (user.role === 'basic' && moviesCreated[1] >= 5) {
      message = 'Maximum created Movie has been reached';
      throw new Error(message);
    }

    const additionalMovieDetails = await this.searchOmdb(movie.title);
    Logger.log('OMDB ', JSON.stringify(additionalMovieDetails));

    if (!additionalMovieDetails?.Error) {
      additionalDetails.title = additionalMovieDetails.Title;
      additionalDetails.released = additionalMovieDetails.Released;
      additionalDetails.genre = additionalMovieDetails.Genre;
      additionalDetails.director = additionalMovieDetails.Director;
    }

    const createMovie = await this.movieRepository.save({
      ...movie,
      ...additionalDetails,
    });
    return createMovie;
  }

  findAll(): Observable<MovieI[]> {
    return from(this.movieRepository.find());
  }

  async findMoviesOfUser(userId: number): Promise<any> {
    return await this.movieRepository.findAndCount({
      where: {
        createdBy: userId,
      },
    });
  }

  async searchOmdb(title: string) {
    return lastValueFrom(
      this.httpService
        .get(`https://www.omdbapi.com/?apikey=dfe37eea&t=${title}`)
        .pipe(map((response) => response.data)),
    );
  }
}

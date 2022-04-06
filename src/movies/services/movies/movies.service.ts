import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { MovieEntity } from 'src/models/movie.entity';
import { MovieI } from 'src/models/movie.interface';
import { Repository } from 'typeorm';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  addMovie(movie: MovieI): Observable<MovieI> {
    return from(this.movieRepository.save(movie));
  }

  findAll(): Observable<MovieI[]> {
    return from(this.movieRepository.find());
  }
}

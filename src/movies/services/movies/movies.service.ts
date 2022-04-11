import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { MovieEntity } from '../../../models/movie.entity';
import { MovieI } from '../../../models/movie.interface';
import { Repository } from 'typeorm';
import { UserI } from 'src/models/user.interface';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  async addMovie(movie: MovieI, user: UserI): Promise<MovieI> {
    let message = '';
    const moviesCreated = await this.findMoviesOfUser2(user.userId);

    if (user.role === 'basic' && moviesCreated[1] >= 5) {
      message = 'Maximum created Movie has been reached';
      throw new Error(message);
    }
    const createMovie = await this.movieRepository.save(movie);
    return createMovie;
  }

  findAll(): Observable<MovieI[]> {
    return from(this.movieRepository.find());
  }

  findMoviesOfUser(userId: number): Observable<[MovieI[], number]> {
    return from(
      this.movieRepository.findAndCount({
        where: {
          createdBy: userId,
        },
        order: {
          released: 'DESC',
        },
      }),
    );
  }

  async findMoviesOfUser2(userId: number): Promise<any> {
    return await this.movieRepository.findAndCount({
      where: {
        createdBy: userId,
      },
    });
  }
}

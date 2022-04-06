import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/models/movie.entity';
import { MoviesController } from './conrollers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

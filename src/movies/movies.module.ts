import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CheckTokenMiddleware } from 'src/middlewares/check-token.middleware';
import { MovieEntity } from 'src/models/movie.entity';
import { MoviesController } from './conrollers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MovieEntity]), HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(MoviesController);
  }
}

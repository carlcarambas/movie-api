import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MovieEntity } from '../../../models/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

const movies = [new MovieEntity(), new MovieEntity()];
const createdMovie: MovieEntity = plainToClass(MovieEntity, {
  id: 1,
  title: 'A test todo',
});

describe('MoviesService', () => {
  let service: MoviesService;

  const mockedRepo = {
    save: jest.fn((dto) => Promise.resolve(createdMovie)),
    find: jest.fn((dto) => Promise.resolve(movies)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: mockedRepo,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() =>
              of({
                Title: 'Jurassic Park',
                Year: '1993',
                Rated: 'PG-13',
                Released: '11 Jun 1993',
                Runtime: '127 min',
                Genre: 'Action, Adventure, Sci-Fi',
                Director: 'Steven Spielberg',
                Writer: 'Michael Crichton, David Koepp',
                Actors: 'Sam Neill, Laura Dern, Jeff Goldblum',
                Plot: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
                Language: 'English, Spanish',
                Country: 'United States',
                Awards: 'Won 3 Oscars. 44 wins & 27 nominations total',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',
                Ratings: [
                  { Source: 'Internet Movie Database', Value: '8.1/10' },
                  { Source: 'Rotten Tomatoes', Value: '92%' },
                  { Source: 'Metacritic', Value: '68/100' },
                ],
                Metascore: '68',
                imdbRating: '8.1',
                imdbVotes: '939,085',
                imdbID: 'tt0107290',
                Type: 'movie',
                DVD: '28 Oct 2003',
                BoxOffice: '$404,214,720',
                Production: 'N/A',
                Website: 'N/A',
                Response: 'True',
              }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

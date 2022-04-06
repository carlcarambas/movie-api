import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MovieEntity } from '../../../models/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

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
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

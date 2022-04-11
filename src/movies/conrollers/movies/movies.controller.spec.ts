import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../../services/movies/movies.service';
import { Response } from 'express';

const mockMoviesService = {
  findAll: jest.fn((dto) => {
    return [];
  }),
  addMovie: jest.fn((dto) => {
    return {
      id: 1,
      released: new Date().toDateString(),
      genre: '',
      director: '',
      ...dto,
    };
  }),
};

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    })
      .overrideProvider(MoviesService)
      .useValue(mockMoviesService)
      .compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movie', () => {
    let request: Request;
    let response: Response;
    // expect.assertions(1);

    expect(
      controller.addMovie(request, response, { title: 'My Movie' }),
    ).resolves.toEqual({
      id: expect.any(Number),
      title: 'My Movie',
      director: expect.any(String),
      genre: expect.any(String),
      released: expect.any(String),
    });

    // expect(mockMoviesService.addMovie).toHaveBeenCalled();
  });

  it('should fetch all movies', () => {
    expect(typeof controller.findAll()).toBe('object');
    expect(controller.findAll()).toMatchObject([]);
    expect(mockMoviesService.findAll).toHaveBeenCalled();
  });
});

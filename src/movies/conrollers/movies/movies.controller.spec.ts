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

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
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

  it('should create a movie', async () => {
    const request = {
      user: {
        userId: 11,
        role: 'basic',
        name: 'Test User',
        username: 'UserName',
        password: 'Secret',
      },
    };

    // expect.assertions(1);
    const res = mockResponse();

    await controller.addMovie(request, res, {
      title: 'My Movie',
    });

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalled();

    expect(mockMoviesService.addMovie).toHaveBeenCalled();
  });

  it('should fetch all movies', () => {
    expect(typeof controller.findAll()).toBe('object');
    expect(controller.findAll()).toMatchObject([]);
    expect(mockMoviesService.findAll).toHaveBeenCalled();
  });
});

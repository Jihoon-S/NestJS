import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      
      expect(result).toBeInstanceOf(Array);
    }) 
  })

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2000
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2000
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    })

    it('shoud return a 404 error', () => {
      try {
        service.deleteOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforCreate = service.getAll().length;
      
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2000
      });

      const afterCreate = service.getAll().length;
      
      expect(afterCreate).toBeGreaterThan(beforCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2000
      });

      service.update(1, {title: 'updated'});

      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated');
    });

    it('shoud return a 404 error', () => {
      try {
        service.update(999, {title: 'updated'});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  });
});

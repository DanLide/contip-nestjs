import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Movie from './movie.entity';
import { Repository } from 'typeorm';
import CreateMovieDto from './dto/createMovie.dto';
import UpdateMovieDto from './dto/updateMovie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  getAllMovies() {
    return this.moviesRepository.find({ relations: ['categories'] });
  }

  async getMovieById(id: number) {
    const movie = await this.moviesRepository.findOne(id, { relations: ['categories'] });
    if (movie) {
      return movie;
    }
    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async createMovie(movie: CreateMovieDto) {
    const newMovie = await this.moviesRepository.create(movie);
    await this.moviesRepository.save(newMovie);
    return newMovie;
  }

  async updateMovie(id: number, movie: UpdateMovieDto) {
    const movieFromDb = await this.moviesRepository.findOne(id);
    if (movieFromDb) {
      this.moviesRepository.merge(movieFromDb, movie);
      await this.moviesRepository.save(movieFromDb);
      return movieFromDb;
    }
    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async deleteMovie(id: number) {
    const deleteResponse = await this.moviesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}

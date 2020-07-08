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
    return this.moviesRepository.find();
  }

  async getMovieById(id: number) {
    const post = await this.moviesRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async createMovie(movie: CreateMovieDto) {
    const newMovie = await this.moviesRepository.create(movie);
    await this.moviesRepository.save(newMovie);
    return newMovie;
  }

  async updateMovie(id: number, movie: UpdateMovieDto) {
    await this.moviesRepository.update(id, movie);
    const updatedMovie = await this.moviesRepository.findOne(id);
    if (updatedMovie) {
      return updatedMovie;
    }
    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async deleteMovie(id: number) {
    const deletedMovie = await this.moviesRepository.delete(id);
    if (!deletedMovie.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}

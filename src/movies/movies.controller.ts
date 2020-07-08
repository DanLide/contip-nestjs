import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import CreateMovieDto from './dto/createMovie.dto';
import UpdateMovieDto from './dto/updateMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.getMovieById(Number(id));
  }

  @Post()
  async createMovie(@Body() movie: CreateMovieDto) {
    return this.moviesService.createMovie(movie);
  }

  @Patch(':id')
  async updateMovie(@Param('id') id: string, @Body() movie: UpdateMovieDto) {
    return this.moviesService.updateMovie(Number(id), movie);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(Number(id));
  }
}

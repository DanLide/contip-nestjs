import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import CreateMovieDto from './dto/createMovie.dto';
import UpdateMovieDto from './dto/updateMovie.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.getMovieById(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createMovie(@Body() movie: CreateMovieDto) {
    return this.moviesService.createMovie(movie);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  async updateMovie(@Param('id') id: string, @Body() movie: UpdateMovieDto) {
    return this.moviesService.updateMovie(Number(id), movie);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(Number(id));
  }
}

import { Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import RequestWithUser from '../utils/requestWithUser.interface';
import CreateRatingDto from './dto/createRating.dto';
import UpdateRatingDto from './dto/updateRating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getUserRatings(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.ratingsService.getRatingsByUserId(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('movie/:id')
  async getMovieRating(@Param('id') movieId: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.ratingsService.getMovieRatingByUserId(user.id, Number(movieId));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createMovieRating(@Req() request: RequestWithUser) {
    const { user } = request;
    const ratingData: CreateRatingDto = request.body;
    return this.ratingsService.createMovieRatingByUserId(user.id, ratingData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('movie/:id')
  async updateMovieRating(@Param('id') movieId: string, @Req() request: RequestWithUser) {
    const { user } = request;
    const ratingData: UpdateRatingDto = request.body;
    return this.ratingsService.updateMovieRatingByUserId(user.id, Number(movieId), ratingData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('movie/:id')
  async deleteMovieRating(@Param('id') movieId: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.ratingsService.deleteMovieRatingByUserId(user.id, Number(movieId));
  }
}

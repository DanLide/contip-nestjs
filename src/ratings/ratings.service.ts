import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Rating from './rating.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import CreateRatingDto from './dto/createRating.dto';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import UpdateRatingDto from './dto/updateRating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    private readonly usersService: UsersService,
  ) {}

  public async getRatingsByUserId(userId: number) {
    return this.ratingsRepository.find({ user: { id: userId } });
  }

  public async getMovieRatingByUserId(userId: number, movieId: number) {
    const rating = await this.ratingsRepository.findOne(
      { user: { id: userId }, movie: { id: movieId } }
    );
    if (rating) { return rating }
    throw new HttpException('Rating not found', HttpStatus.NOT_FOUND);
  }

  public async createMovieRatingByUserId(userId: number, ratingData: CreateRatingDto) {
    try {
      const user = await this.usersService.getPlainUserById(userId);
      const newRating = await this.ratingsRepository.create({
        ...ratingData,
        user,
      });
      await this.ratingsRepository.save(newRating);
      return newRating;
    } catch (error) {
      if (error?.code === PostgresErrorCode) {
        throw new HttpException('This rating already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateMovieRatingByUserId(userId: number, movieId: number, ratingData: UpdateRatingDto) {
    const rating = await this.getMovieRatingByUserId(userId, movieId);
    await this.ratingsRepository.update(rating.id, ratingData);
    return await this.getMovieRatingByUserId(userId, movieId);
  }

  public async deleteMovieRatingByUserId(userId: number, movieId: number) {
    const rating = await this.getMovieRatingByUserId(userId, movieId);
    await this.ratingsRepository.delete(rating.id);
  }
}

// src/obj-name/obj-name.resolver.ts

import { Resolver, Query, Args } from '@nestjs/graphql';
import { AppService } from './app.service';
import {
  BookingConnection,
  BookingPaginationArgs,
} from 'src/types/booking.types';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key/api-key.guard';

@Resolver(() => BookingConnection)
@UseGuards(ApiKeyGuard)
export class AppResolver {
  constructor(private readonly bookingService: AppService) {}

  @Query(() => BookingConnection)
  async booking(
    @Args('paginationArgs') paginationArgs: BookingPaginationArgs,
  ): Promise<BookingConnection> {
    return this.bookingService.findAll(paginationArgs);
  }
}

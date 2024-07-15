// src/obj-name/obj-name.resolver.ts

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AppService } from './app.service';
import {
  BookingConnection,
  BookingFilterInput,
  BookingOrderByInput,
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
    @Args('first', { type: () => Int, nullable: true }) first?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('orderBy', { type: () => [BookingOrderByInput], nullable: true })
    orderBy?: BookingOrderByInput[],
    @Args('where', { type: () => BookingFilterInput, nullable: true })
    where?: BookingFilterInput,
    @Args('after', { type: () => String, nullable: true }) after?: string,
  ): Promise<BookingConnection> {
    return this.bookingService.findAll({
      first,
      offset,
      orderBy,
      where,
      after,
    });
  }
}

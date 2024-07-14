import { Injectable } from '@nestjs/common';
import {
  Booking,
  BookingConnection,
  BookingEdge,
  BookingPaginationArgs,
  PageInfo,
} from './types/booking.types';

@Injectable()
export class AppService {
  private readonly bookings: Booking[] = [
    { bookingReference: '1', name: 'Object 1', description: 'Description 1' },
    { bookingReference: '2', name: 'Object 2', description: 'Description 2' },
    { bookingReference: '3', name: 'Object 3', description: 'Description 2' },
    { bookingReference: '4', name: 'Object 4', description: 'Description 4' },
    { bookingReference: '5', name: 'Object 5', description: 'Description 5' },
    { bookingReference: '6', name: 'Object 6', description: 'Description 6' },
    { bookingReference: '7', name: 'Object 7', description: 'Description 7' },
    { bookingReference: '8', name: 'Object 8', description: 'Description 8' },
    { bookingReference: '9', name: 'Object 9', description: 'Description 9' },
  ];

  async findAll(
    paginationArgs: BookingPaginationArgs,
  ): Promise<BookingConnection> {
    const { first = 10, after } = paginationArgs;

    // Mock implementation of cursor-based pagination
    let startIdx = 0;
    if (after) {
      const afterIdx = this.bookings.findIndex(
        (obj) => obj.bookingReference === after,
      );
      if (afterIdx !== -1) {
        startIdx = afterIdx + 1;
      }
    }

    const paginatedItems = this.bookings.slice(startIdx, startIdx + first);
    const edges: BookingEdge[] = paginatedItems.map((item) => ({
      node: item,
      cursor: item.bookingReference,
    }));

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const hasNextPage = startIdx + first < this.bookings.length;

    const pageInfo: PageInfo = {
      endCursor,
      hasNextPage,
    };

    return {
      edges,
      pageInfo,
    };
  }
}

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
    {
      bookingReference: '12345',
      name: 'Object 1',
      description: 'Description 1',
    },
    {
      bookingReference: '12346',
      name: 'Object 2',
      description: 'Description 2',
    },
    {
      bookingReference: '12347',
      name: 'Object 3',
      description: 'Description 2',
    },
    {
      bookingReference: '12348',
      name: 'Object 4',
      description: 'Description 4',
    },
    {
      bookingReference: '12349',
      name: 'Object 5',
      description: 'Description 5',
    },
    {
      bookingReference: '12350',
      name: 'Object 6',
      description: 'Description 6',
    },
    {
      bookingReference: '12351',
      name: 'Object 7',
      description: 'Description 7',
    },
    {
      bookingReference: '12352',
      name: 'Object 8',
      description: 'Description 8',
    },
    {
      bookingReference: '12353',
      name: 'Object 9',
      description: 'Description 9',
    },
  ];

  async findAll(
    paginationArgs: BookingPaginationArgs,
  ): Promise<BookingConnection> {
    const { first = 10, offset = 0, orderBy, where, after } = paginationArgs;

    // Filter bookings based on `where` condition if provided
    let filteredBookings = this.bookings;
    if (where) {
      filteredBookings = filteredBookings.filter((booking) => {
        return (
          (!where.name || booking.name.includes(where.name)) &&
          (!where.description ||
            booking.description.includes(where.description))
        );
      });
    }

    // Sort bookings based on `orderBy` condition if provided
    if (orderBy) {
      filteredBookings.sort((a, b) => {
        for (const order of orderBy) {
          const fieldA = a[order.field];
          const fieldB = b[order.field];
          if (fieldA < fieldB) return order.direction === 'ASC' ? -1 : 1;
          if (fieldA > fieldB) return order.direction === 'ASC' ? 1 : -1;
        }
        return 0;
      });
    }

    // Apply offset and pagination
    let startIdx = offset;
    if (after) {
      const afterIdx = filteredBookings.findIndex(
        (obj) => obj.bookingReference === after,
      );
      if (afterIdx !== -1) {
        startIdx = afterIdx + 1;
      }
    }

    const paginatedItems = filteredBookings.slice(startIdx, startIdx + first);
    const edges: BookingEdge[] = paginatedItems.map((item) => ({
      node: item,
      cursor: item.bookingReference,
    }));

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const hasNextPage = startIdx + first < filteredBookings.length;

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

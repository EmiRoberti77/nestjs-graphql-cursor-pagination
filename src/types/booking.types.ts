// src/types/obj-name.types.ts

import {
  Field,
  ObjectType,
  Int,
  ID,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => ID)
  bookingReference: string;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class BookingEdge {
  @Field(() => Booking)
  node: Booking;

  @Field()
  cursor: string;
}

@ObjectType()
export class PageInfo {
  @Field()
  endCursor: string;

  @Field()
  hasNextPage: boolean;
}

@ObjectType()
export class BookingConnection {
  @Field(() => [BookingEdge])
  edges: BookingEdge[];

  @Field()
  pageInfo: PageInfo;
}

@InputType()
export class BookingOrderByInput {
  @Field()
  field: string;

  @Field(() => SortDirection)
  direction: SortDirection;
}

@InputType()
export class BookingFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class BookingPaginationArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => [BookingOrderByInput], { nullable: true })
  orderBy?: BookingOrderByInput[];

  @Field(() => BookingFilterInput, { nullable: true })
  where?: BookingFilterInput;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
});

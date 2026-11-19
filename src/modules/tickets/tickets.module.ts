import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema.js';
import { Attachment, AttachmentSchema } from './schemas/attachment.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Attachment.name, schema: AttachmentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TicketsModule {}

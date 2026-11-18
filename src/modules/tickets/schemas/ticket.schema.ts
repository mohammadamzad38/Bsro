import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  WAITING = 'waiting',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum Ticket_Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HEIGH = 'high',
  URGENT = 'urgent',
}

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ timestamps: true, collection: 'tickets' })
export class Ticket {
  @Prop({ required: true, trim: true, maxlength: 200 })
  subject: string;

  @Prop({ required: true, trim: true, maxLength: 10000 })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assignedTo: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Prop({
    type: String,
    enum: Object.values(Ticket_Priority),
    default: Ticket_Priority.MEDIUM,
  })
  priority: Ticket_Priority;

  @Prop({ required: true, trim: true, maxLength: 100 })
  category: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.index({ createdBy: 1, createdAt: -1 });
TicketSchema.index({ assigneTo: 1, status: 1 });
TicketSchema.index({ status: 1, priority: 1, createdAt: 1 });

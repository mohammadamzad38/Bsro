import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AttachmentDocument = HydratedDocument<Attachment>;

@Schema({ timestamps: true, collection: 'attachments' })
export class Attachment {
  @Prop({ type: Types.ObjectId, ref: 'Ticket', required: true })
  ticket: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ required: true, trim: true })
  originalName: string;

  @Prop({ required: true, trim: true })
  storageKey: string;

  @Prop({ required: true, trim: true })
  mimeType: string;

  @Prop({ required: true, min: 1 })
  size: number;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);

AttachmentSchema.index({ ticket: 1, createdAt: 1 });

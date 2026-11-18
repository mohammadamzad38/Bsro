import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Ticket', required: true })
  ticket: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop()
  message: string;

  @Prop({ default: false })
  isInternal: boolean;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ ticket: 1, createdAt: 1 });
CommentSchema.index({ author: 1, createdAt: -1 });

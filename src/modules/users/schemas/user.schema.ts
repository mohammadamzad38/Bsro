import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type usrDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'user' })
export class User {
  @Prop({ required: true, maxLength: 50 })
  name: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 100,
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: String, default: null, select: false })
  refreshTokenHash: string | null;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isvarified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

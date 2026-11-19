import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission {
  @Prop({ unique: true, requird: true, trim: true })
  key: string;

  @Prop({ required: true, trim: true })
  description: string;
}
export const PermissionsSchema = SchemaFactory.createForClass(Permission);

PermissionsSchema.index({ key: 1 }, { unique: true });

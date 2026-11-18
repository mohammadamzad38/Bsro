import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true, collection: 'roles' })
export class Role {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Permissions' }], default: [] })
  permissions: Types.ObjectId[];
}

export const RolesSchema = SchemaFactory.createForClass(Role);
RolesSchema.index({ slug: 1 }, { unique: true });

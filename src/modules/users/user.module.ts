import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { Role, RolesSchema } from '../roles/schemas/role.schemas.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RolesSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class UserModule {}

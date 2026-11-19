import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RolesSchema } from './schemas/role.schemas.js';
import { Permission, PermissionsSchema } from './schemas/permissions.schems.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RolesSchema },
      { name: Permission.name, schema: PermissionsSchema },
    ]),
  ],

  exports: [MongooseModule],
})
export class RolesModule {}

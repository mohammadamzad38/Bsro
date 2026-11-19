import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema.js';
import { Model } from 'mongoose';
import { RegisetrDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/schemas/role.schemas.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async register(registerDto: RegisetrDto) {
    const email = registerDto.email.trim().toLowerCase();
    const isDuplicateUser = await this.userModel.findOne({ email });

    if (isDuplicateUser) {
      throw new ConflictException('Email already registerd');
    }

    const hashPass = await bcrypt.hash(registerDto.password, 12);
    const defaultRole = await this.roleModel.findOne({ slug: 'user' });

    if (!defaultRole) {
      throw new NotFoundException('Default USER role not found');
    }
    try {
      const user = await this.userModel.create({
        name: registerDto.name,
        email,
        password: hashPass,
        role: defaultRole._id,
      });

      return {
        message: 'User registerd Successfully',
        user: user,
        role: user.role,
      };
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        throw new ConflictException('Email already registerd');
      }
      throw error;
    }
  }
}

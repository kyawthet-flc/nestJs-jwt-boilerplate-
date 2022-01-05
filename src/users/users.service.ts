import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcryptjs';

export type UserType = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string): Promise<UserType | undefined> {
    return await this.userRepository.findOne({
      select: ['name', 'email', 'password', 'device_token', 'phone'],
      where: { email },
    });
  }

  async getByName(name: string): Promise<UserType | undefined> {
    return await this.userRepository.findOne({
      select: ['name', 'email', 'password', 'device_token', 'phone'],
      where: { name },
    });
  }

  async create(userObj: UserType): Promise<UserType | undefined> {
    delete userObj.confirm_password;
    return this.userRepository.save(this.userRepository.create(userObj));
  }

  async changePassword(
    userId: number,
    password: string,
  ): Promise<UserType | undefined> {
    const updatedUser = await this.userRepository.findOne(userId);
    updatedUser.password = await bcrypt.hash(password, 8);
    return this.userRepository.save(updatedUser);
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UserType | undefined> {
    const updatedUser = await this.userRepository.findOne(userId);
    updatedUser.name = updateProfileDto.name;
    updatedUser.email = updateProfileDto.email;
    updatedUser.phone = updateProfileDto.phone;
    return this.userRepository.save(updatedUser);
  }
}

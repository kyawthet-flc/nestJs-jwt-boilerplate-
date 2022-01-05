import { Body, Controller, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResponseHelper } from '../helpers/response.helper';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auth/update/password')
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.usersService.changePassword(
        req.user.userId,
        changePasswordDto.password,
      );
      return new ResponseHelper({
        status: 'success',
        msg: 'Successfully Update Password.',
      }).successful();
    } catch (error) {}
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/update/profile')
  async updateProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    try {
      await this.usersService.updateProfile(req.user.userId, updateProfileDto);
      return new ResponseHelper({
        status: 'success',
        msg: 'Successfully Update Profile.',
      }).successful();
    } catch (error) {
      return new ResponseHelper({
        status: 'success',
        msg: 'Successfully Update Profile.',
      }).failed();
    }
  }
}

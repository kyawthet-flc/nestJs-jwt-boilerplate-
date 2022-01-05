import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RegisterDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';
import { ResponseHelper } from './helpers/response.helper';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.usersService.create({
        ...{ uid: 'ss' },
        ...registerDto,
      });
      return {
        status: 'success',
        msg: 'Successfully Registered.',
      };
    } catch (error) {
      return new ResponseHelper({
        status: 'error',
        msg: error.sqlMessage,
      }).failed();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req: any) {
    return { text: req.user.userId };
  }
}

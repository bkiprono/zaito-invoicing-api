import { UsersService } from 'src/users/services/users.service';
import { OtpService } from './../../otp/services/otp.service';
import { Global, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { DatabaseModelEnums } from 'src/database/enums/database.enum';
import { CustomHttpResponse, generatePassword } from 'src/shared';
import { HttpStatusCodeEnum } from 'src/shared/enums/status-codes.enum';
import {
  UpdatePasswordDto,
  UpdatePasswordWithOTPDto,
  UpdatePasswordWithTokenDto,
} from 'src/users/dto/update-password.dto';
import { User } from 'src/users/interfaces/user.interface';
import { SettingsService } from '../../settings/services/settings.service';
import { OTP } from 'src/otp/interfaces/otp.interface';
import { ResetPasswordDTO } from 'src/auth/dtos/reset-password.dto';
import { SystemEventsEnum } from 'src/events/enums/events.enum';
import { JwtService } from '@nestjs/jwt';

@Global()
@Injectable()
export class PasswordService {
  constructor(
    @Inject(DatabaseModelEnums.USER_MODEL) private user: Model<User>,
    private readonly settingsService: SettingsService,
    private readonly otpService: OtpService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}
  /**
   * Reset user password
   *
   * @param {string} email
   * @return {*}  {Promise<any>}
   * @memberof AuthService
   */
  async resetPassword(payload: ResetPasswordDTO): Promise<CustomHttpResponse> {
    const { email, useOTP } = payload;
    const res = (await this.usersService.getUserUsingEmail(email)).data;
    if (res && res.user) {
      const user: User = res.user;
      const settings = (await this.settingsService.getSettings()).data;

      const token = await this.jwtService.signAsync(
        { token: generatePassword({ includeSpecialChars: true, length: 80 }) },
        {
          expiresIn: '1d',
        },
      );
      user.resetPasswordToken = token;
      await this.setPasswordResetToken({ token, id: user._id });

      // Emit the event that the clinic password request has been initiated
      this.eventEmitter.emit(SystemEventsEnum.PasswordResetRequested, {
        user,
        settings,
        useOTP,
      });

      return new CustomHttpResponse(
        HttpStatusCodeEnum.OK,
        `A password reset email has been sent!`,
        null,
      );
    }
    return new CustomHttpResponse(
      HttpStatusCodeEnum.UNAUTHORIZED,
      'User with that email is not registered',
      null,
    );
  }
  /**
   * Get user using the reset password token
   *
   * @param {string} resetPasswordToken
   * @return {*}  {Promise<CustomHttpResponse>}
   * @memberof UsersService
   */
  async getUserUsingResetPasswordToken(
    resetPasswordToken: string,
  ): Promise<CustomHttpResponse> {
    try {
      // get the user using the password reset token
      const user: User | undefined = await this.user
        .findOne({ resetPasswordToken })
        .exec();

      if (!user || resetPasswordToken === null) {
        throw new Error('The token provided does not exist or is expired');
      }
      return new CustomHttpResponse(HttpStatusCodeEnum.OK, 'User found', user);
    } catch (error) {
      return new CustomHttpResponse(
        HttpStatusCodeEnum.BAD_REQUEST,
        'There was an issue getting the user. Token invalid',
        error,
      );
    }
  }

  /**
   * Update user password using the reset token link generated by the app
   *
   * @param {UpdatePasswordWithTokenDto} data
   * @return {*}  {Promise<CustomHttpResponse>}
   * @memberof UsersService
   */
  async processUpdatePasswordWithToken(
    data: UpdatePasswordWithTokenDto,
  ): Promise<CustomHttpResponse> {
    try {
      const { resetPasswordToken } = data;
      // get the user using the password reset token
      const user: User | undefined = await this.user
        .findOne({ resetPasswordToken })
        .exec();

      if (!user || resetPasswordToken === null) {
        throw new Error('The token provided does not exist or is expired');
      }

      return this.updatePassword(user._id, data as UpdatePasswordDto);
    } catch (error) {
      return new CustomHttpResponse(
        HttpStatusCodeEnum.BAD_REQUEST,
        'There was an issue resetting your password. Try again',
        error,
      );
    }
  }

  /**
   * Update user password using the otp code generated by the app
   *
   * @param {UpdatePasswordWithOTPDto} payload
   * @return {*}  {Promise<CustomHttpResponse>}
   * @memberof UsersService
   */
  async processUpdatePasswordWithOTP(
    payload: UpdatePasswordWithOTPDto,
  ): Promise<CustomHttpResponse> {
    try {
      const { code } = payload;

      const otp: OTP | undefined = await (
        await this.otpService.findByCode(code)
      ).data;

      if (!otp) {
        return new CustomHttpResponse(
          HttpStatusCodeEnum.BAD_REQUEST,
          'The OTP code invalid',
          null,
        );
      }

      const resetPasswordToken = otp.token;

      // get the user using the password reset token
      const user: User | undefined = await this.user
        .findOne({ resetPasswordToken })
        .exec();

      if (!user || resetPasswordToken === null) {
        throw new Error('The token provided does not exist or is expired');
      }

      // Emit the event that the otp has been used
      this.eventEmitter.emit(SystemEventsEnum.OTP_USED, code);

      return this.updatePassword(user._id, payload as UpdatePasswordDto);
    } catch (error) {
      return new CustomHttpResponse(
        HttpStatusCodeEnum.BAD_REQUEST,
        'There was an issue resetting your password. Try again',
        error,
      );
    }
  }

  async processUpdatePasswordWhenLoggedIn(data: {
    updatePasswordDto: UpdatePasswordDto;
    passwordResetCode: string;
  }): Promise<CustomHttpResponse> {
    try {
      const { passwordResetCode } = data;
      // get the user using the password reset token
      const user: User | undefined = await this.user
        .findOne({ passwordResetCode })
        .exec();

      if (!user || passwordResetCode === null) {
        throw new Error('The token provided does not exist or is expired');
      }

      return this.updatePassword(user._id, data.updatePasswordDto);
    } catch (error) {
      return new CustomHttpResponse(
        HttpStatusCodeEnum.BAD_REQUEST,
        'There was an issue resetting your password. Try again',
        error,
      );
    }
  }
  /**
   * Update Password functionality
   *
   * @param {UpdatePasswordDto} updatePasswordDto
   * @return {*}  {Promise<CustomHttpResponse>}
   * @memberof UsersService
   */
  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<CustomHttpResponse> {
    try {
      const { password, confirmPassword } = updatePasswordDto;
      // Confirm password matching
      if (password !== confirmPassword) {
        return new CustomHttpResponse(
          HttpStatusCodeEnum.FORBIDDEN,
          'The passwords you have provided does not match. Try again!',
          null,
        );
      }

      const filter = { _id: id };
      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the password
      const user = await this.user.findOneAndUpdate(
        filter,
        {
          password: hashedPassword,
          isPasswordDefault: false,
          resetPasswordToken: null,
          updatedAt: new Date(),
          lastPasswordChange: new Date(),
        },
        {
          returnOriginal: false,
        },
      );

      // Emit the event that the password has been updated
      this.eventEmitter.emit(SystemEventsEnum.PASSWORD_RESET_SUCCESS, user);

      return new CustomHttpResponse(
        HttpStatusCodeEnum.OK,
        'Your password was updated successfully',
        user,
      );
    } catch (error) {
      return new CustomHttpResponse(
        HttpStatusCodeEnum.OK,
        error.message,
        error,
      );
    }
  }

  /**
   * Set password reset token to the user data
   *
   * @param {{ token: string; id: string }} payload
   * @return {*}
   * @memberof UsersService
   */
  async setPasswordResetToken(payload: { token: string; id: string }) {
    const filter = { _id: payload.id };
    return await this.user.findOneAndUpdate(
      filter,
      {
        resetPasswordToken: payload.token,
      },
      { returnOriginal: false },
    );
  }
}

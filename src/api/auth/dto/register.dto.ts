import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterResponse {
  @ApiProperty({
    description: 'Enail пользователя',
    example: 'fdsbnfd2345@gmail.com',
    type: String,
  })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'Fgdbgfhfg3554', type: String })
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль не должен быть меньше 6 символов' })
  @MaxLength(128, { message: 'Пароль не должен быть больше 128 символов' })
  password: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'Игорь', type: String })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(50, { message: 'Имя не должно быть больше 50 символов' })
  name: string;
}

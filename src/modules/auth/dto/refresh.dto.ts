import { IsJWT } from 'class-validator';

export class refreshTokenDto {
  @IsJWT()
  refreshToken: string;
}

import { IsJWT, IsString, MinLength } from 'class-validator';

export class ResetDTO {
  @IsJWT()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

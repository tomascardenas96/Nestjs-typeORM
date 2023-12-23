import { PartialType } from '@nestjs/mapped-types';
import { TuitDTO } from './create-tuit.dto';

export class UpdateTuit extends PartialType(TuitDTO) {}

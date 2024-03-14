import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/userData.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: createUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');
    console.log(value);
    console.log(metadata)

    const parseIntAge=parseInt(value.age.toString());
    if(isNaN(parseIntAge)){
      console.log(`${value.age} is not number`);
      throw new HttpException(
        'inavlid Data Type for propert age. Expected number',HttpStatus.BAD_REQUEST
      )
    }
    return {...value,parseIntAge};
  }
}

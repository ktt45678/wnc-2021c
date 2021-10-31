import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../models';

@Pipe({
  name: 'userInArray'
})
export class UserInArrayPipe implements PipeTransform {

  transform(value: User[], arg: User): boolean {
    return !!value.find(user => user._id === arg._id);
  }

}

import { UserInArrayPipe } from './user-in-array.pipe';

describe('UserInArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new UserInArrayPipe();
    expect(pipe).toBeTruthy();
  });
});

import {PagingPipe} from './paging.pipe';

describe('PagingPipe', () => {
  let pipe: PagingPipe;
  beforeEach(() => {
    pipe = new PagingPipe();
  });

  it('should default paging 1, size 10', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const result = pipe.transform(arr);
    expect(result).toEqual(arr.slice(0, 10));
  });

  it('should paging by custom.', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const result = pipe.transform(arr, 2, 3);
    expect(result).toEqual([4, 5, 6]);
  });

  it('should return empty array.', () => {
    const result = pipe.transform([], 2, 3);
    expect(result).toEqual([]);
  });
});

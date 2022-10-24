import { expect, describe, it } from 'vitest';
import { foo } from '../src/index';

describe('basic', () => {
  it('foo', () => {
    expect(foo()).toBeDefined();
  });
});
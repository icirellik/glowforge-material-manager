// @vitest-environment node
import { createHash } from 'crypto';
import { materialIdForTitle } from './materialId';

describe('materialIdForTitle', () => {
  it('is the start of the title hash', async () => {
    const hash = createHash('sha1').update('Thin Birch').digest('hex');
    expect(await materialIdForTitle('Thin Birch')).toEqual(
      `Custom:${hash.slice(0, 7)}`,
    );
  });
});

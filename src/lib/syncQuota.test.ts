import { syncItemCost } from './syncQuota';

describe('syncItemCost', () => {
  it('counts the key and the value as JSON, in UTF-8', () => {
    expect(syncItemCost('key', 'abc')).toBe(3 + 5);
    expect(syncItemCost('key', '')).toBe(3 + 2);
    // Escaped characters.
    expect(syncItemCost('', '"\\\n')).toBe(2 + 6);
    expect(syncItemCost('', '<')).toBe(2 + 6);
    expect(syncItemCost('', '\u0001')).toBe(2 + 6);
    expect(syncItemCost('', ' ')).toBe(2 + 6);
    // Non-ASCII, as UTF-8.
    expect(syncItemCost('', 'é')).toBe(2 + 2);
    expect(syncItemCost('', '€')).toBe(2 + 3);
    expect(syncItemCost('', '🌸')).toBe(2 + 4);
    expect(syncItemCost('', '\ud800x')).toBe(2 + 3 + 1);
  });

  it('counts a byte per character of a legacy value above 0x7F twice', () => {
    expect(syncItemCost('', 'x\u009c')).toBe(2 + 1 + 2);
  });
});

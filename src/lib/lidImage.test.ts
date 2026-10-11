// @vitest-environment node
import manifest from '../../public/manifest.json';
import {
  LID_IMAGE_ORIGIN,
  hasLidImageAccess,
  isLidImageUrl,
  removeLidImageAccess,
  requestLidImageAccess,
} from './lidImage';

describe('lid images', () => {
  it('only accepts Glowforge lid image URLs', () => {
    expect(
      isLidImageUrl(
        'https://storage.googleapis.com/gf-app-imgl/abc/lid.jpg?GoogleAccessId=x&Signature=y',
      ),
    ).toBe(true);
    for (const url of [
      'http://storage.googleapis.com/gf-app-imgl/abc/lid.jpg',
      'https://storage.googleapis.com/other-bucket/lid.jpg',
      'https://storage.googleapis.com.example.com/gf-app-imgl/lid.jpg',
      'https://example.com/gf-app-imgl/lid.jpg',
      '/gf-app-imgl/lid.jpg',
      'not a url',
    ]) {
      expect(isLidImageUrl(url), url).toBe(false);
    }
  });

  it("is an optional permission, so updates don't ask for it", () => {
    expect(manifest.optional_host_permissions).toContain(LID_IMAGE_ORIGIN);
    expect(manifest.host_permissions).not.toContain(LID_IMAGE_ORIGIN);
  });

  it('asks Chrome for access to them', async () => {
    const permissions = {
      contains: vi.fn().mockResolvedValue(true),
      request: vi.fn().mockResolvedValue(true),
      remove: vi.fn().mockResolvedValue(true),
    };
    vi.stubGlobal('chrome', { permissions });
    expect(await hasLidImageAccess()).toBe(true);
    expect(await requestLidImageAccess()).toBe(true);
    expect(await removeLidImageAccess()).toBe(true);
    for (const call of [
      permissions.contains,
      permissions.request,
      permissions.remove,
    ]) {
      expect(call).toHaveBeenCalledWith({ origins: [LID_IMAGE_ORIGIN] });
    }
    vi.unstubAllGlobals();
  });
});

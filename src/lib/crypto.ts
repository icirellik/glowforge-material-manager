// This file has no secrets in it, its just a hack to get jest to behave.

/**
 * A simple hash function.
 *
 * @param message The message to hash.
 */
export async function sha1(message: string) {
  const msgBuffer = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => (`00${b.toString(16)}`).slice(-2)).join('');
}

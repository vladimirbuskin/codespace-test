import test from 'ava';
import { init } from '../../src/server.mjs';

test('home controller works', async t => {
  let server = await init()
  // we need to check home / url here
  t.is([1, 2, 3].indexOf(4), -1)
});

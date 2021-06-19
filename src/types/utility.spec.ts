import { RecursivePartial } from './utility';

describe('types', () => {
  describe('utility', () => {
    test('RecursivePartial', () => {
      const a = {
        p11: 'v11',
        p12: {
          p21: 'v21',
          p22: {
            p31: 'v31',
            p32: 'v32',
          },
        },
      };
      const b = {
        p11: 'v11',
        p12: {
          p21: 'v21',
          p22: {
            p31: 'v31',
          },
        },
      };
      // @ts-ignore only `Partial` does not compile
      new Array<Partial<typeof a>>(a, b);
      new Array<RecursivePartial<typeof a>>(a, b);
      expect(true).toBe(true);
    });
  });
});

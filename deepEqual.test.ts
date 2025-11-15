import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  describe('Примитивные значения', () => {
    test('должна возвращать true для одинаковых чисел', () => {
      expect(deepEqual(5, 5)).toBe(true);
      expect(deepEqual(0, 0)).toBe(true);
      expect(deepEqual(-10, -10)).toBe(true);
    });

    test('должна возвращать true для одинаковых строк', () => {
      expect(deepEqual('test', 'test')).toBe(true);
      expect(deepEqual('', '')).toBe(true);
    });

    test('должна возвращать true для одинаковых булевых значений', () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });

    test('должна возвращать true для null', () => {
      expect(deepEqual(null, null)).toBe(true);
    });

    test('должна возвращать true для undefined', () => {
      expect(deepEqual(undefined, undefined)).toBe(true);
    });

    test('должна возвращать true для NaN', () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
    });

    test('должна возвращать false для разных примитивов', () => {
      expect(deepEqual(5, 10)).toBe(false);
      expect(deepEqual('test', 'test2')).toBe(false);
      expect(deepEqual(true, false)).toBe(false);
    });
  });

  describe('Массивы', () => {
    test('должна возвращать true для одинаковых массивов', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(deepEqual([], [])).toBe(true);
      expect(deepEqual([1], [1])).toBe(true);
    });

    test('должна возвращать true для вложенных массивов', () => {
      expect(deepEqual([[1], [2]], [[1], [2]])).toBe(true);
      expect(deepEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
    });

    test('должна возвращать false для массивов разной длины', () => {
      expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
      expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    test('должна возвращать false для массивов с разными элементами', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(deepEqual([1, 2], [2, 1])).toBe(false);
    });

    test('должна корректно обрабатывать массивы с объектами', () => {
      expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
      expect(deepEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
    });
  });

  describe('Вложенные объекты', () => {
    test('должна возвращать true для одинаковых простых объектов', () => {
      expect(deepEqual({}, {})).toBe(true);
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    test('должна возвращать true для одинаковых вложенных объектов', () => {
      const obj1 = {
        name: 'test',
        data: {
          x: 1,
          y: 2
        }
      };

      const obj2 = {
        name: 'test',
        data: {
          x: 1,
          y: 2
        }
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    test('должна возвращать false для объектов с разными значениями', () => {
      const obj1 = {
        name: 'test',
        data: {
          x: 1,
          y: 2
        }
      };

      const obj2 = {
        name: 'test',
        data: {
          x: 1,
          y: 3
        }
      };

      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    test('должна возвращать false для объектов с разными ключами', () => {
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    test('должна корректно обрабатывать глубоко вложенные объекты', () => {
      const obj1 = {
        level1: {
          level2: {
            level3: {
              value: 42
            }
          }
        }
      };

      const obj2 = {
        level1: {
          level2: {
            level3: {
              value: 42
            }
          }
        }
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });

  describe('Циклические ссылки', () => {
    test('должна корректно обрабатывать объекты с циклическими ссылками', () => {
      const obj1: any = { val: 1 };
      obj1.self = obj1;

      const obj2: any = { val: 1 };
      obj2.self = obj2;

      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    test('должна возвращать false для циклических объектов с разными значениями', () => {
      const obj1: any = { val: 1 };
      obj1.self = obj1;

      const obj2: any = { val: 2 };
      obj2.self = obj2;

      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    test('должна корректно обрабатывать сложные циклические структуры', () => {
      const obj1: any = {
        a: 1,
        b: {
          c: 2
        }
      };
      obj1.b.parent = obj1;
      obj1.self = obj1;

      const obj2: any = {
        a: 1,
        b: {
          c: 2
        }
      };
      obj2.b.parent = obj2;
      obj2.self = obj2;

      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });

  describe('Сравнение разных типов', () => {
    test('должна возвращать false для разных типов примитивов', () => {
      expect(deepEqual(5, '5')).toBe(false);
      expect(deepEqual(0, false)).toBe(false);
      expect(deepEqual(1, true)).toBe(false);
      expect(deepEqual('', 0)).toBe(false);
    });

    test('должна возвращать false для null и undefined', () => {
      expect(deepEqual(null, undefined)).toBe(false);
      expect(deepEqual(undefined, null)).toBe(false);
    });

    test('должна возвращать false для массива и объекта', () => {
      expect(deepEqual([], {})).toBe(false);
      expect(deepEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
    });

    test('должна возвращать false для объекта и примитива', () => {
      expect(deepEqual({}, '')).toBe(false);
      expect(deepEqual({}, 0)).toBe(false);
      expect(deepEqual({}, null)).toBe(false);
    });

    test('должна возвращать false для массива и примитива', () => {
      expect(deepEqual([], '')).toBe(false);
      expect(deepEqual([], 0)).toBe(false);
    });
  });

  describe('Комплексные случаи', () => {
    test('должна корректно обрабатывать смешанные структуры', () => {
      const obj1 = {
        numbers: [1, 2, 3],
        strings: ['a', 'b'],
        nested: {
          array: [1, 2],
          value: 42
        }
      };

      const obj2 = {
        numbers: [1, 2, 3],
        strings: ['a', 'b'],
        nested: {
          array: [1, 2],
          value: 42
        }
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    test('должна корректно обрабатывать объекты с массивами объектов', () => {
      const obj1 = {
        items: [
          { id: 1, name: 'test1' },
          { id: 2, name: 'test2' }
        ]
      };

      const obj2 = {
        items: [
          { id: 1, name: 'test1' },
          { id: 2, name: 'test2' }
        ]
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
    });
  });
});

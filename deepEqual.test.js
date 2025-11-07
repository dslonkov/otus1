const { deepEqual, DeepEqual, DeepEqualExtended } = require('./deepEqual');

class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('Запуск тестов...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        console.log(`✅ ${name}`);
        this.passed++;
      } catch (error) {
        console.error(`❌ ${name}`);
        console.error(`   Ошибка: ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\nРезультаты: ${this.passed} пройдено, ${this.failed} провалено`);
    return this.failed === 0;
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }
}

const runner = new TestRunner();

runner.test('Примитивы', () => {
  runner.assert(deepEqual(5, 5));
  runner.assert(deepEqual('test', 'test'));
  runner.assert(deepEqual(true, true));
  runner.assert(deepEqual(null, null));
  runner.assert(!deepEqual(5, 10));
  runner.assert(deepEqual(NaN, NaN));
});

runner.test('Массивы', () => {
  runner.assert(deepEqual([1, 2, 3], [1, 2, 3]));
  runner.assert(deepEqual([], []));
  runner.assert(!deepEqual([1, 2], [1, 2, 3]));
  runner.assert(deepEqual([[1], [2]], [[1], [2]]));
});

runner.test('Вложенные объекты', () => {
  const a = {
    name: 'test',
    data: {
      x: 1,
      y: 2
    }
  };

  const b = {
    name: 'test',
    data: {
      x: 1,
      y: 2
    }
  };

  const c = {
    name: 'test',
    data: {
      x: 1,
      y: 3
    }
  };

  runner.assert(deepEqual(a, b));
  runner.assert(!deepEqual(a, c));
  runner.assert(deepEqual({}, {}));
});

runner.test('Циклические ссылки', () => {
  const obj1 = { val: 1 };
  obj1.self = obj1;

  const obj2 = { val: 1 };
  obj2.self = obj2;

  const obj3 = { val: 2 };
  obj3.self = obj3;

  runner.assert(deepEqual(obj1, obj2));
  runner.assert(!deepEqual(obj1, obj3));
});

runner.test('Разные типы', () => {
  runner.assert(!deepEqual(5, '5'));
  runner.assert(!deepEqual(0, false));
  runner.assert(!deepEqual(null, undefined));
  runner.assert(!deepEqual([], {}));
});

if (require.main === module) {
  runner.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { TestRunner, runner };

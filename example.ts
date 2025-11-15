import { deepEqual, DeepEqualExtended } from './deepEqual';

console.log('=== Примеры использования функции deepEqual ===\n');

console.log('1. Сравнение примитивных значений:');
console.log('   deepEqual(5, 5):', deepEqual(5, 5));
console.log('   deepEqual("hello", "hello"):', deepEqual('hello', 'hello'));
console.log('   deepEqual(true, true):', deepEqual(true, true));
console.log('   deepEqual(NaN, NaN):', deepEqual(NaN, NaN));
console.log('   deepEqual(5, 10):', deepEqual(5, 10));
console.log('   deepEqual(5, "5"):', deepEqual(5, '5'));
console.log();

console.log('2. Сравнение массивов:');
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = [1, 2, 4];
console.log('   deepEqual([1, 2, 3], [1, 2, 3]):', deepEqual(arr1, arr2));
console.log('   deepEqual([1, 2, 3], [1, 2, 4]):', deepEqual(arr1, arr3));
console.log('   deepEqual([[1], [2]], [[1], [2]]):', deepEqual([[1], [2]], [[1], [2]]));
console.log();

console.log('3. Сравнение простых объектов:');
const obj1 = { name: 'John', age: 30 };
const obj2 = { name: 'John', age: 30 };
const obj3 = { name: 'John', age: 31 };
console.log('   deepEqual({ name: "John", age: 30 }, { name: "John", age: 30 }):', 
  deepEqual(obj1, obj2));
console.log('   deepEqual({ name: "John", age: 30 }, { name: "John", age: 31 }):', 
  deepEqual(obj1, obj3));
console.log();

console.log('4. Сравнение вложенных объектов:');
const nested1 = {
  user: {
    personal: {
      name: 'Alice',
      age: 25
    },
    contacts: {
      email: 'alice@example.com',
      phone: '123-456-7890'
    }
  },
  settings: {
    theme: 'dark',
    notifications: true
  }
};

const nested2 = {
  user: {
    personal: {
      name: 'Alice',
      age: 25
    },
    contacts: {
      email: 'alice@example.com',
      phone: '123-456-7890'
    }
  },
  settings: {
    theme: 'dark',
    notifications: true
  }
};

const nested3 = {
  user: {
    personal: {
      name: 'Alice',
      age: 26
    },
    contacts: {
      email: 'alice@example.com',
      phone: '123-456-7890'
    }
  },
  settings: {
    theme: 'dark',
    notifications: true
  }
};

console.log('   deepEqual(nested1, nested2):', deepEqual(nested1, nested2));
console.log('   deepEqual(nested1, nested3):', deepEqual(nested1, nested3));
console.log();

console.log('5. Сравнение объектов с циклическими ссылками:');
const cyclic1: any = {
  value: 42,
  data: {
    nested: 'test'
  }
};
cyclic1.self = cyclic1;
cyclic1.data.parent = cyclic1;

const cyclic2: any = {
  value: 42,
  data: {
    nested: 'test'
  }
};
cyclic2.self = cyclic2;
cyclic2.data.parent = cyclic2;

const cyclic3: any = {
  value: 43,
  data: {
    nested: 'test'
  }
};
cyclic3.self = cyclic3;
cyclic3.data.parent = cyclic3;

console.log('   deepEqual(cyclic1, cyclic2):', deepEqual(cyclic1, cyclic2));
console.log('   deepEqual(cyclic1, cyclic3):', deepEqual(cyclic1, cyclic3));
console.log();

console.log('6. Сравнение смешанных структур (объекты с массивами):');
const mixed1 = {
  id: 1,
  tags: ['javascript', 'typescript', 'testing'],
  metadata: {
    created: '2024-01-01',
    updated: '2024-01-02',
    authors: [
      { name: 'Author1', role: 'developer' },
      { name: 'Author2', role: 'reviewer' }
    ]
  }
};

const mixed2 = {
  id: 1,
  tags: ['javascript', 'typescript', 'testing'],
  metadata: {
    created: '2024-01-01',
    updated: '2024-01-02',
    authors: [
      { name: 'Author1', role: 'developer' },
      { name: 'Author2', role: 'reviewer' }
    ]
  }
};

const mixed3 = {
  id: 1,
  tags: ['javascript', 'typescript'],
  metadata: {
    created: '2024-01-01',
    updated: '2024-01-02',
    authors: [
      { name: 'Author1', role: 'developer' },
      { name: 'Author2', role: 'reviewer' }
    ]
  }
};

console.log('   deepEqual(mixed1, mixed2):', deepEqual(mixed1, mixed2));
console.log('   deepEqual(mixed1, mixed3):', deepEqual(mixed1, mixed3));
console.log();

console.log('7. Использование расширенных методов:');
const extended1 = { a: 1, b: 2, timestamp: Date.now() };
const extended2 = { a: 1, b: 2, timestamp: Date.now() + 1000 };

console.log('   DeepEqualExtended.compareIgnoringKeys(extended1, extended2, ["timestamp"]):',
  DeepEqualExtended.compareIgnoringKeys(extended1, extended2, ['timestamp']));

const result = DeepEqualExtended.compareWithDetails(extended1, extended2);
console.log('   DeepEqualExtended.compareWithDetails(extended1, extended2):', result);
console.log();

console.log('8. Сравнение разных типов (должно возвращать false):');
console.log('   deepEqual(0, false):', deepEqual(0, false));
console.log('   deepEqual(null, undefined):', deepEqual(null, undefined));
console.log('   deepEqual([], {}):', deepEqual([], {}));
console.log('   deepEqual("123", 123):', deepEqual('123', 123));
console.log();

console.log('=== Примеры завершены ===');

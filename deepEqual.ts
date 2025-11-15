type ComparableValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | ComparableValue[] 
  | ComparableObject;

interface ComparableObject {
  [key: string]: ComparableValue;
}

interface ComparisonResult {
  equal: boolean;
  differences: string[];
}

class DeepEqual {
  static compare(
    x: ComparableValue,
    y: ComparableValue,
    seen1: WeakSet<ComparableObject> = new WeakSet(),
    seen2: WeakSet<ComparableObject> = new WeakSet()
  ): boolean {
    if (this.checkPrimitives(x, y)) {
      return true;
    }

    if (x === null || y === null || x === undefined || y === undefined) {
      return x === y;
    }

    if (typeof x !== typeof y) {
      return false;
    }

    if (this.checkCycle(x, y, seen1, seen2)) {
      return true;
    }

    if (Array.isArray(x) && Array.isArray(y)) {
      return this.compareArr(x, y, seen1, seen2);
    }

    if (this.isObj(x) && this.isObj(y)) {
      return this.compareObj(x, y, seen1, seen2);
    }

    return false;
  }

  static checkPrimitives(x: ComparableValue, y: ComparableValue): boolean {
    if (x === y) {
      return true;
    }

    if (Number.isNaN(x as number) && Number.isNaN(y as number)) {
      return true;
    }

    return false;
  }

  static checkCycle(
    x: ComparableValue,
    y: ComparableValue,
    seen1: WeakSet<ComparableObject>,
    seen2: WeakSet<ComparableObject>
  ): boolean {
    if (this.isObj(x) && this.isObj(y)) {
      if (seen1.has(x) && seen2.has(y)) {
        return true;
      }
      seen1.add(x);
      seen2.add(y);
    }
    return false;
  }

  static compareArr(
    arr1: ComparableValue[],
    arr2: ComparableValue[],
    seen1: WeakSet<ComparableObject>,
    seen2: WeakSet<ComparableObject>
  ): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (!this.compare(arr1[i], arr2[i], seen1, seen2)) {
        return false;
      }
    }

    return true;
  }

  static compareObj(
    obj1: ComparableObject,
    obj2: ComparableObject,
    seen1: WeakSet<ComparableObject>,
    seen2: WeakSet<ComparableObject>
  ): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }

      if (!this.compare(obj1[key], obj2[key], seen1, seen2)) {
        return false;
      }
    }

    return true;
  }

  static isObj(val: ComparableValue): val is ComparableObject {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }
}

class DeepEqualExtended extends DeepEqual {
  static compareWithDetails(x: ComparableValue, y: ComparableValue): ComparisonResult {
    const res: ComparisonResult = {
      equal: this.compare(x, y),
      differences: []
    };

    if (!res.equal) {
      res.differences.push('Значения не равны');
    }

    return res;
  }

  static compareIgnoringKeys(
    x: ComparableValue,
    y: ComparableValue,
    skipKeys: string[] = []
  ): boolean {
    if (!this.isObj(x) || !this.isObj(y)) {
      return this.compare(x, y);
    }

    const filtered1 = this.removeKeys(x, skipKeys);
    const filtered2 = this.removeKeys(y, skipKeys);

    return this.compare(filtered1, filtered2);
  }

  static removeKeys(obj: ComparableObject, skipKeys: string[]): ComparableObject {
    const res: ComparableObject = {};
    for (const key in obj) {
      if (!skipKeys.includes(key)) {
        res[key] = obj[key];
      }
    }
    return res;
  }
}

export function deepEqual(a: ComparableValue, b: ComparableValue): boolean {
  return DeepEqual.compare(a, b);
}

export { DeepEqual, DeepEqualExtended, ComparableValue, ComparableObject, ComparisonResult };

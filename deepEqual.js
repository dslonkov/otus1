class DeepEqual {
  static compare(x, y, seen1 = new WeakSet(), seen2 = new WeakSet()) {
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

  static checkPrimitives(x, y) {
    if (x === y) {
      return true;
    }

    if (Number.isNaN(x) && Number.isNaN(y)) {
      return true;
    }

    return false;
  }

  static checkCycle(x, y, seen1, seen2) {
    if (this.isObj(x) && this.isObj(y)) {
      if (seen1.has(x) && seen2.has(y)) {
        return true;
      }
      seen1.add(x);
      seen2.add(y);
    }
    return false;
  }

  static compareArr(arr1, arr2, seen1, seen2) {
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

  static compareObj(obj1, obj2, seen1, seen2) {
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

  static isObj(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }
}

class DeepEqualExtended extends DeepEqual {
  static compareWithDetails(x, y) {
    const res = {
      equal: this.compare(x, y),
      differences: []
    };

    if (!res.equal) {
      res.differences.push('Значения не равны');
    }

    return res;
  }

  static compareIgnoringKeys(x, y, skipKeys = []) {
    if (!this.isObj(x) || !this.isObj(y)) {
      return this.compare(x, y);
    }

    const filtered1 = this.removeKeys(x, skipKeys);
    const filtered2 = this.removeKeys(y, skipKeys);

    return this.compare(filtered1, filtered2);
  }

  static removeKeys(obj, skipKeys) {
    const res = {};
    for (const key in obj) {
      if (!skipKeys.includes(key)) {
        res[key] = obj[key];
      }
    }
    return res;
  }
}

function deepEqual(a, b) {
  return DeepEqual.compare(a, b);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    deepEqual,
    DeepEqual,
    DeepEqualExtended
  };
}

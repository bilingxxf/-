/**
 * Array polyfills
 */

/**
 * Remove an item in the array of given key and value
 * @param {string} key
 * @param value
 * @returns {any} return a new array
 */
Array.prototype.removeItem = function (key: string, value?: any): any[] {
  if (key === undefined) { return this; }

  if (arguments.length === 2 && value === undefined) { return this; }

  let targetIndex: number;

  if (arguments.length === 1) {
    targetIndex = this.indexOf(key);
  } else {
    targetIndex = this.findIndex((item) => item[key] === value);
  }

  if (targetIndex === -1) { return this; }

  return [
    ...this.slice(0, targetIndex),
    ...this.slice(targetIndex + 1)
  ];
};


/**
 * Find an item in the array and update data
 * @param {string} key
 * @param data
 * @returns {any[]} return a new array
 */
Array.prototype.updateItem = function (key: string, data: any): any[] {
  if (key === undefined || data === undefined) { return this; }

  const targetIndex: number = this.findIndex((item) => item[key] === data[key]);

  if (targetIndex === -1) { return this; }

  const constructor = this[targetIndex].constructor;

  return [
    ...this.slice(0, targetIndex),
    new constructor({
      ...this[targetIndex],
      ...data,
    }),
    ...this.slice(targetIndex + 1)
  ];
};


/**
 * Push an item if not in the array; remove it if already in the array
 * @param item
 * @returns {any[]}
 */
Array.prototype.toggleItem = function (item: any): any[] {
  if (!item) { return this; }

  const targetIndex: number = this.indexOf(item);

  if (targetIndex === -1) {
    return [ ...this, item ];
  } else {
    return [
      ...this.slice(0, targetIndex),
      ...this.slice(targetIndex + 1)
    ];
  }
};


/**
 * Merge two arrays into a new array
 * @param item
 * @returns {any[]}
 */
Array.prototype.merge = function (item: any[]): any[] {
  if (!Array.isArray(item)) { return this; }

  return item.filter((i) => this.indexOf(i) === -1).concat(this);
};

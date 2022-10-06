module.exports = {
  objToArr: (obj) => {
    const array = [];

    const objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
      array.push(obj[objKeys[i]]);
    }

    return array;
  },
  objMerge: (obj1, obj2) => {
    for (var k in obj1) {
      obj2[k] = obj1[k];
    }
    return obj2;
  },
};

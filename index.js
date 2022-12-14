const { parse } = require('csv-parse/sync');

module.exports = class NodeUtils {
  static clone = (obj) =>{
    return JSON.parse(JSON.stringify(obj))
  }

  static flatten = (arrays) => {
    return arrays.flat(Infinity);
  }

  static present = (data) => {
    let type = (typeof data)
    switch(type) {
      case 'object':
        return (Array.isArray(data) ? data : Object.keys(data || {})).length > 0;
        break;
      case 'number':
        return data.toString() ? true : false;
        break;
      default:
        return data ? true : false;
        break;
    }
  }

  static indexBy = (array, key) =>  {
    let returnValue = {};
    for(let item of array) {
      if(returnValue[item[key]]) {
        returnValue[item[key]].push(item);
      } else {
        returnValue[item[key]] = [item];
      }
    }
    return returnValue;
  }

  static only = (object, keys) => {
    let returnValue = {}
    keys.forEach(key => {
      if(object[key]?.toString()) {
        returnValue[key] = object[key]
      }
    });
    return returnValue;
  }

  static except = (object, keys) => {
    let returnValue = NodeUtils.clone(object)
    keys.forEach(key => {
      if(keys.includes(key)) {
        delete returnValue[key]
      }
    })
    return returnValue
  }

  static pluck = (array, key) => {
    return array.map(data => data[key])
  }

  static compact = (array) => {
    return array.filter(data => NodeUtils.present(data))
  }

  static parseCSV = (csv_content, { delimeter = ',', isHeader = false }) => {
    return parse(csv_content, { delimiter: delimeter, columns: isHeader, trim: true })
  }

  static uniq = (data) => {
    return data.filter((v, i, a) => a.indexOf(v) === i);
  }
}
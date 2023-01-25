const { parse } = require('csv-parse/sync');
const { Buffer } = require('buffer');

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

  static timeStamp = (date = null) => {
    let currentDate = new Date();
    if (date) {
      currentDate = new Date(date);
    }

    let timestamp = currentDate.getTime();
    return timestamp;
  }

  static getUUID = () => {
    let timestamp = this.timeStamp();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      r = ((timestamp + r) % 16) | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  };

  static getClass = (field) => {
    return field?.constructor?.name;
  }

  static stripObject = (input) => {
    for (let key in input) {
      if (!this.present(input[key])) {
        delete input[key]
      }
    }
    return input;
  }

  static toString(value, minDigit = 0) {
    if(minDigit > value.toString().length) {
      let count = minDigit - value.toString().length
      return Array.from({ length: count }, () => 0).join('') + value.toString();
    } else {
      return value.toString();
    }
  }

  static encodeBase64 = (value) => {
    return Buffer.from(value).toString('base64');
  }

  static decodeBase64 = (value) => {
    return Buffer.from(value, 'base64').toString();
  }

  static sleep = (seconds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, (seconds * 1000))
    })
  }
}
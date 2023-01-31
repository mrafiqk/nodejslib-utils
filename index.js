const { parse } = require('csv-parse/sync');
const { Buffer } = require('buffer');
const FormData = require('form-data');

class NodeUtils {
  clone = (obj) =>{
    return JSON.parse(JSON.stringify(obj))
  }

  flatten = (arrays) => {
    return arrays.flat(Infinity);
  }

  present = (data) => {
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

  indexBy = (array, key) =>  {
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

  only = (object, keys) => {
    let returnValue = {}
    keys.forEach(key => {
      if(object[key]?.toString()) {
        returnValue[key] = object[key]
      }
    });
    return returnValue;
  }

  except = (object, keys) => {
    let returnValue = NodeUtils.clone(object)
    keys.forEach(key => {
      if(keys.includes(key)) {
        delete returnValue[key]
      }
    })
    return returnValue
  }

  pluck = (array, key) => {
    return array.map(data => data[key])
  }

  compact = (array) => {
    return array.filter(data => NodeUtils.present(data))
  }

  parseCSV = (csv_content, { delimeter = ',', isHeader = false }) => {
    return parse(csv_content, { delimiter: delimeter, columns: isHeader, trim: true })
  }

  uniq = (data) => {
    return data.filter((v, i, a) => a.indexOf(v) === i);
  }

  timeStamp = (date = null) => {
    let currentDate = new Date();
    if (date) {
      currentDate = new Date(date);
    }

    let timestamp = currentDate.getTime();
    return timestamp;
  }

  getUUID = () => {
    let timestamp = this.timeStamp();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      r = ((timestamp + r) % 16) | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  };

  getClass = (field) => {
    return field?.constructor?.name;
  }

  stripObject = (input) => {
    for (let key in input) {
      if (!this.present(input[key])) {
        delete input[key]
      }
    }
    return input;
  }

  toString(value, minDigit = 0) {
    if(minDigit > value.toString().length) {
      let count = minDigit - value.toString().length
      return Array.from({ length: count }, () => 0).join('') + value.toString();
    } else {
      return value.toString();
    }
  }

  encodeBase64 = (value) => {
    return Buffer.from(value).toString('base64');
  }

  decodeBase64 = (value) => {
    return Buffer.from(value, 'base64').toString();
  }

  sleep = (seconds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, (seconds * 1000))
    })
  }
  toFormData(payload) {
		let formData = new FormData();
		for (let key in payload) {
			if ( payload[key] instanceof FileList || (payload[key].constructor.name == 'Array' && payload[key][0].constructor.name == 'File' ) ) {
				for (let file of payload[key]) {
					formData.append(key, file, file.name);
				}
			} else {
				let value;
				if(['Array','Object'].includes(payload[key].constructor.name)){
					value = [key].concat(JSON.stringify(payload[key]))
				}else{
					value = [key].concat(payload[key])
				}
				formData.append.apply(formData, value);
			}
		}
		return formData;
	}
}

module.exports = { NodeUtils }

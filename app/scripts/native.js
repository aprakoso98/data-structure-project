window.Console = {
  success: {
    background: "white",
    color: "green",
    "font-size": "15px"
  },
  error: {
    background: "white",
    color: "red",
    "font-size": "15px"
  },
  log: function(text, css) {
    css = css || {}
    text = typeof text == 'object' ? JSON.stringify(text) : text;
    css = Object.join(css, ":", ";");
    text = text.Contains("%c") ? text : "%c" + text;
    console.log(text, css);
  },
  debug: function(text, css) {
    css = css || {}
    text = typeof text == 'object' ? JSON.stringify(text) : text;
    css = Object.join(css, ":", ";");
    text = text.Contains("%c") ? text : "%c" + text;
    console.debug(text, css);
  }
}
Array.prototype.Contains = String.prototype.Contains = function(element) {
  return this.indexOf(element) > -1;
}
Array.prototype.serializeArrayToObject = function() {
  var ret = {}
  for (var i = 0; i < this.length; i++) {
    ret[this[i].name] = this[i].value;
  }
  return ret;
}
Array.prototype.loopCallback = function(callback, reverse, index) {
  var arr = this;

  function retCallback(timeout) {
    timeout = timeout || 0;
    setTimeout(function() {
      arr.loopCallback(callback, reverse, index + 1);
    }, timeout);
  }

  function retCallbackReverse(timeout) {
    timeout = timeout || 0;
    setTimeout(function() {
      if (index > 0)
        arr.loopCallback(callback, reverse, index);
    }, timeout);
  }
  if (reverse) {
    index = index || arr.length;
    index--;
    callback(arr[index], index, retCallbackReverse);
  } else {
    index = index || 0;
    if (index < arr.length) {
      callback(arr[index], index, retCallback);
    }
  }
}
Number.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
}
Number.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
Number.prototype.Compare = function(num) {
  return Math.abs(this - num);
}
Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
Object.join = function(object, glue, separator) {
  if ([undefined, ""].Contains(glue))
    glue = '=';
  if ([undefined, ""].Contains(separator))
    separator = ', ';
  return jQuery.map(Object.getOwnPropertyNames(object), function(k) { return [k, object[k]].join(glue) }).join(separator);
}
String.prototype.getNameFromUrl = function() {
  var name = this.split("/"),
    name = name[name.length - 1],
    name = decodeURI(name);
  return name;
}
String.prototype.ucfirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.lcfirst = function() {
  return this.charAt(0).toLowerCase() + this.slice(1);
}
String.prototype.ucwords = function() {
  return this.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}
String.prototype.isHTML = function() {
  var str = this, doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some(function(node){
    return node.nodeType === 1;
  });
}
Object.filterObj = function(Obj, Arr) {
  var ret = {}
  for (var key in Obj) {
    if (Arr.Contains(key)) {
      ret[key] = Obj[key]
    }
  }
  return ret;
}

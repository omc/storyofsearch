// Copyright 2014 Dan Simpson, MIT Licsense
(function(root) {

  function Scale(el) {
    this.el = el;
    this.resize();
    this.x1 = Infinity;
    this.x2 = -Infinity;
    this.y1 = Infinity;
    this.y2 = -Infinity;
  }

  Scale.prototype = {

    x: function(v) {
      return ((v - this.x1) / (this.x2 - this.x1)) * this.width;
    },

    y: function(v) {
      return this.height - ((v - this.y1) / (this.y2 - this.y1)) * this.height;
    },

    h: function(v) {
      return (v / (this.y2 - this.y1)) * this.height;
    },

    w: function(v) {
      return (v / (this.x2 - this.x1)) * this.width;
    },

    rx: function(x) {
      return ((x / this.width) * (this.x2 - this.x1)) + this.x1;
    },

    ry: function(y) {
      return this.y2 - (y / this.height) * (this.y2 - this.y1);
    },

    range: function(y1, y2) {
      this.y1 = Math.min(y1, this.y1);
      this.y2 = Math.max(y2, this.y2);
    },

    domain: function(x1, x2) {
      this.x1 = Math.min(x1, this.x1);
      this.x2 = Math.max(x2, this.x2);
    },

    auto: function(data) {
      if(!(data instanceof Array)) {
        console.warn("auto scale requires array");
        return;
      }

      if(isNaN(data[0]) && data[0] instanceof Array) {
        for(var i = 0;i < data.length;i++) {
          this.range(data[i][1], data[i][1]);
          this.domain(data[i][0], data[i][0]);
        }
        return;
      }

      this.domain(0, data.length);
      this.range(Math.min.apply(Math, data), Math.max.apply(Math, data));
    },

    resize: function() {
      var rect = this.el.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
    }
  }

  root.$canvas = function(fn, el) {
    var scale = new Scale(el), 
        canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");

    canvas.style.position = "absolute";
    canvas.setAttribute("height", scale.height);
    canvas.setAttribute("width", scale.width);
    
    el.appendChild(canvas);

    window.addEventListener("resize", function() {
      scale.resize();
      canvas.setAttribute("height", scale.height);
      canvas.setAttribute("width", scale.width);
      fn(context, scale);
    });
    
    fn(context, scale);
  }

})(window);
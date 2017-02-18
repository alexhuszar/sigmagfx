(function ($, window, document) {
	"use strict";
	var PictPreloader = function (images, options) {
			this.options = {
				pipeline: false,
				auto: true,
				container : "body",
				/* onProgress: function () {}, */
				/* onError: function () {}, */
				onComplete: function () {}
			};

			options && typeof options === 'object' && this.setOptions(options);
			
			if(typeof images === 'object') {
				var templistImage = [];
				for(i=0;i<images.length;i++){
					templistImage[i] = images[i].src;
				}
			}else{
				templistImage = images;
			}
			this.addQueue(templistImage);
			this.queue.length && this.options.auto && this.processQueue();
		};
	PictPreloader.prototype.setOptions = function (options) {
		var o = this.options,
			key;
		for (key in options) options.hasOwnProperty(key) && (o[key] = options[key]);
		return this;
	};

	PictPreloader.prototype.addQueue = function (images) {
		this.queue = images.slice();
		return this;
	};

	PictPreloader.prototype.reset = function () {
		this.completed = [];
		this.errors = [];
		return this;
	};

	PictPreloader.prototype.load = function (src, index) {
		var image = new Image(),
			self = this,
			o = this.options;
		image.onerror = image.onabort = function () {
			this.onerror = this.onabort = this.onload = null;

			self.errors.push(src);
			o.onError && o.onError.call(self, src);
			self.checkProgress.call(self, src);
			o.pipeline && self.loadNext(index);
		};
		image.onload = function () {
			this.onerror = this.onabort = this.onload = null;
			// store progress. this === image
			self.completed.push(src); // this.src may differ
			self.checkProgress.call(self, src, this);
			o.pipeline && self.loadNext(index);
		};
		image.src = src;
		return this;
	};

	PictPreloader.prototype.loadNext = function (index) {
		index++;
		this.queue[index] && this.load(this.queue[index], index);
		return this;
	};

	PictPreloader.prototype.processQueue = function () {
		var i = 0,
			queue = this.queue,
			len = queue.length;
		this.reset();
		if (!this.options.pipeline) for (; i < len; ++i) this.load(queue[i], i);
		else this.load(queue[0], 0);

		return this;
	};
	PictPreloader.prototype.checkProgress = function (src, image) {
		var args = [],
			o = this.options,
			element = document.getElementById(o.container);
		var percent = Math.floor((100 / this.queue.length) * this.completed.length);
			element.innerHTML = '<div style="width:'+percent+'%"></div><span>' + this.queue.length + '/' +this.completed.length+' ('+percent+'%)</span>';
		o.onProgress && src && o.onProgress.call(this, src, image, this.completed.length);

		if (this.completed.length + this.errors.length === this.queue.length) {
			args.push(this.completed);
			this.errors.length && args.push(this.errors);
			element.className = element.className + " complete";
			o.onComplete.apply(this, args);
		}
		return this;
	};
	window.PictPreloader = PictPreloader;
}(this.jQuery, this, document,this.images,this.options));

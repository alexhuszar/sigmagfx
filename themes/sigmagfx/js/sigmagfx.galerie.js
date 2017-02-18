(function ($, window, document) {
	"use strict";
	var GalileoSlider = function (options) {
		this.options = {
			container: "container",
			minWidth: 768,
			imageWidth: "",
			callback: function(param){}
		};
		options && typeof options === 'object' && this.setOptions(options);
		this.init();
	};
	GalileoSlider.prototype.innerWindowSize =  function(){
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		return {width: x, height: y};
	};
	GalileoSlider.prototype.setOptions = function (options) {
		var o = this.options,
			key;
		for (key in options) options.hasOwnProperty(key) && (o[key] = options[key]);
		return this;
	};
	GalileoSlider.prototype.fixScreen = function () {
		var _this = this,i,j,
			o = this.options,
			tempImg,
			tempdiv,
			$row = $("#"+o.container + " .row"),
			rowWidth = [],
			rowChildren,
			rowChildrenImg; 
		for(j=0;j<$row.length;j++){
				tempImg = 0;
			rowChildren = $row[j].children;
			rowChildrenImg = $($row[j].children).find("img");
			tempdiv = $($row[j].children).find(".title"); 
			if(o.imageWidth == "") {
				for(i=0;i<rowChildren.length;i++){
					tempImg = ( rowChildrenImg[i].width !== "undefined" ? rowChildrenImg[i].width : o.imageWidth);
					o.imageWidth = Math.max(o.imageWidth,tempImg);
				}
			}
			rowWidth.push(rowChildren.length * o.imageWidth);
			tempdiv.css({"width":o.imageWidth});
			rowChildrenImg.css({"width":o.imageWidth})
			if(_this.innerWindowSize().width < o.minWidth) {
				$row.css({"width":"auto"});
				return; 
			}else{		
				$row.css({"width":rowWidth[j] + 2});				
			}
			if(_this.innerWindowSize().width < o.minWidth) {
				$(rowChildren).addClass("col-md-2");
				$(rowChildren).removeClass("col-item");
			}else{
				$(rowChildren).removeClass("col-md-2");
				$(rowChildren).addClass("col-item");
			}
			
		}
	};
	GalileoSlider.prototype.scroll = function () {
		var _this = this,
			o = this.options,
			activeRow,
			rowleft,booleanLeft = false,
			levelCount = 0,
			maskWidth,
			activeRowWidth,
			moveRow,
			maxLevel,
			diference = 0,
			cssAnimate = $("html").hasClass("csstransitions"),
			$navbar  = $("#"+o.container + " .navbar div");
			activeRow = $("#"+o.container +" .row.active");
			$navbar.bind("click", function() {	
				var _this = $(this);
				if(_this.hasClass("disable")) return;
				maskWidth =  Math.round($("#portfolio-mask").width());
				activeRowWidth = activeRow.width();
				booleanLeft =_this.hasClass("next");
				maxLevel = Math.round((activeRowWidth  - maskWidth)/o.imageWidth)+1;
				if( booleanLeft  === true ) {
					if(levelCount >= 0 && levelCount < maxLevel) 
					{
						levelCount++;
						diference = 0;					
					}
					$("#portfolio-prev.prev").removeClass("disable");
				}else{
					if(levelCount > 0 ) 
					{
						$("#portfolio-next.next").removeClass("disable");
						levelCount--;
					}
				}
				moveRow = levelCount * o.imageWidth;
				moveRow = moveRow  - diference;
				
				if(!((activeRowWidth - maskWidth) > (levelCount * o.imageWidth)) && booleanLeft) {
					moveRow = activeRowWidth - maskWidth;
					diference =  ( (levelCount * o.imageWidth) + maskWidth) - activeRowWidth ;
					_this.addClass("disable");
				}else {
					if(moveRow <= 0) {
						moveRow = 0;
						$("#portfolio-prev.prev").addClass("disable");
					}
				}
				if(cssAnimate){
					activeRow.transition({ x: -moveRow  }, 300, 'ease-out', function() {
					});
				}else{
					activeRow.animate({
						left: -moveRow}, 300, function() {
					});
				}
			});
			if (o.callback instanceof Function) {
				o.callback.apply(this, ["Play Done!"]);
			}
	};
	GalileoSlider.prototype.init = function () {
		var _this = this,
			o = this.options,
			$container = $("#"+o.container);
			_this.fixScreen();		
			$container.bind("myresize", function() {
				_this.fixScreen($container);	
			});
			$(window).resize(function() {
				$container.trigger("myresize");
			});
			$container.trigger("myresize");
			_this.scroll();
			$container.removeClass("hide")
			$(document).on({
				mouseenter: function () {
					$(this).find(".project-hover").addClass("active")
				},

				mouseleave: function () {
					$(this).find(".project-hover").removeClass("active")
				}
			}, '.thumbnail');
	};	
	window.GalileoSlider = GalileoSlider;
}(this.jQuery, this, document,this.options));


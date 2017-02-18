(function ($, window, document) {
	"use strict";
	var sOut,
	Pagination = function (options) {
		this.options = {
			fadeOutIn: 1000,
			timeout: 4000,
			container : "pagination"
		};
		options && typeof options === 'object' && this.setOptions(options);
		this.init();
	};
	Pagination.prototype.setOptions = function (options) {
		var o = this.options,
			key;
		for (key in options) options.hasOwnProperty(key) && (o[key] = options[key]);
		return this;
	};
	Pagination.prototype.createTag = function (tag, ParentElement, attr) {
		var el = document.createElement(tag),
			parent = document.body,
			i;
		if (typeof ParentElement === "string") {
			parent = document.getElementById(ParentElement);
		}
		if (typeof ParentElement === "object" && typeof ParentElement.tagName !== "undefined") {
			parent = ParentElement;
		}
		for (i in attr) {
			$(el).attr(i, attr[i]);
		}
		parent.appendChild(el);
		return el;
	};
	Pagination.prototype.animation = function(_a){
		var o =  this.options,
			_this = this,_next,
			__this =$("#"+o.container +" current"),
			count = parseFloat($("#"+o.container +" .current").attr("href").split("-")[1]);
			if(count >= _a) count=0
			count+=1;
			_next = $("#statement-"+count);
		clearTimeout(sOut);
		sOut = setTimeout(function (){
			$("#"+o.container+ " .current").removeClass();
			$("a#statement-"+count).addClass("current");
			$("#"+o.container+ " .show").animate({
				opacity:0
			}, o.fadeOutIn, function() {
				$(this).removeClass("show");
				$(_next).addClass("show")
				$(_next).animate({
					opacity:1
				}, o.fadeOutIn, function() {
					$(this).addClass("opacity0")
					 _this.animation(_a);
				});
			});
		} ,o.timeout);
	}
	
	Pagination.prototype.init = function(){
		var _this = this,
			o =  this.options,i,
			cont =  document.getElementById(o.container),
			a_list = cont.children;
			_this.createTag("nav",o.container,{"id": o.container+"-nav"});
			_this.createTag("ul",o.container+"-nav",{"id": o.container+"-p","class":"pagination"});
			for(i=0;i<a_list.length-1;i++){
				$(a_list[i]).attr({"id":"statement-"+(i+1) ,"class": (i == 0) ? "show opacity0" : "opacity0"})
				var temp = _this.createTag("li",o.container+"-p",{});
				temp = _this.createTag("a",temp,{"id":"statement-"+(i+1), "href":"#statement-"+(i+1), "class": (i == 0) ? "current" : ""});
				temp.innerHTML = "statement-"+(i+1);
			}
		$("#"+o.container +" a").on("click",function(e){
			clearTimeout(sOut);
			var __this = this,
				_next = $(this).attr("href");
				$("#"+o.container+ " .current").removeClass("current");
				$(this).addClass("current");
			e.preventDefault();
			$("#"+o.container+ " .show").animate({
				opacity:0
			}, o.fadeOutIn, function() {
				$(this).removeClass("show");
				$(_next).addClass("show")
				$(_next).animate({
					opacity:1
				}, o.fadeOutIn, function() {
					$(this).addClass("opacity0")
					 _this.animation(a_list.length-1);
				 });
			});
		});
		$("#"+o.container+ " .show").animate({
				opacity:1
			}, o.fadeOutIn, function () {
			_this.animation(a_list.length-1);
		});
	};
	window.Pagination = Pagination;
}(this.jQuery, this, document,this.options));

$( document ).ready(function() {
	//preloader
	var preload = new PictPreloader($("img"), {	
		pipeline: true,
		container: "loader" ,
		onComplete: function(){
			$(".page").addClass("active");
			
			//galileoSlider
			
			$("#work-sigmagfx").removeClass("opacity0");
			$("#work-sigmagfx").addClass("opacity1");
		}
	});
	//end get preload images
	var pag = new Pagination({container: "sigmagfx-pagination", fadeOutIn :800 , timeout:4000})
	
	var gal = new GalileoSlider({container:"galileo",imageWidth:300})
	
});

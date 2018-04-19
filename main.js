//show and hide topbtn
// function yScroll() {
    
//     var yPos = window.pageYOffset;
    
//     if (yPos >= window.innerHeight - 5) {
//         document.getElementById("topbtn").style.opacity = 1;
//     } else {
//         document.getElementById("topbtn").style.opacity = 0;
//     }
// }

//scroll to top
function goTop () {
    let topbtn = document.getElementById('topbtn');
    let top = window.pageYOffset;
    
    var intervalTimer = setInterval(function() {
        if (top > 0) {
            top -= 15;
            window.scrollTo(0, top);
        } else {
            topbtn.style.opacity = 0;
            clearInterval(intervalTimer);
        }
    }, 0.5);
}

function showAnimate(arrivePoint) {
    let flag = true;
    let timer = setInterval(function() {
        
        let icur = window.pageYOffset;
        //Buffer movement, speed change at any time
        let speed = (arrivePoint - icur) / 12;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//Take integer speed
        if (icur || icur == 0) {
            window.scrollTo(0, icur + speed);
        }
        if (arrivePoint !== icur) {
            flag = false;
        } else {
            flag = true;
        }
        
        if (flag) {
            clearInterval(timer);
            isComplete = true;
        }
    },13);
}



var isComplete = true;

function wheel (e){
    
    if(isComplete == true){ //Prevent multiple repeat function
        
        isComplete = false;
        
        if (e.wheelDelta) {  //IE,Chrome MouseScroll
            stopScroll();
            if (e.wheelDelta > 0) { //When the pulley rolls up
                let arrivePoint = window.pageYOffset - window.innerHeight;
                //arrivePoint cannot be negative
                arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
                showAnimate(arrivePoint);
            }
            
            if (e.wheelDelta < 0) { //When the pulley rolls down
                let arrivePoint = window.pageYOffset + window.innerHeight;
                //maximum rolling point
                let maxBottom = document.body.offsetHeight - window.innerHeight;
                //If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
                arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
                showAnimate(arrivePoint);
                // titleShow();
            }
        }
        else if (e.detail) {  //Firefox MouseScroll
            if (e.detail< 0) { //When the pulley rolls up
                let arrivePoint = document.documentElement.scrollTop - window.innerHeight;
                //arrivePoint cannot be negative
                arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
                showAnimate(arrivePoint);
            }
            if (e.detail> 0) { //When the pulley rolls down
                let arrivePoint = document.documentElement.scrollTop + window.innerHeight;
                let maxBottom = document.body.offsetHeight - window.innerHeight;
                //If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
                arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
                showAnimate(arrivePoint);
                // titleShow();
            }
        }
    }
}

//Bubble prevention
function stopScroll() {
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    
    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
        e.preventDefault();
        e.returnValue = false;
    }
    
    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }
    var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown
    , isDisabled;
    (function disableScroll() {
        if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, true);
        oldonwheel = window.onwheel;
        window.onwheel = preventDefault; // modern standard
        
        oldonmousewheel1 = window.onmousewheel;
        window.onmousewheel = preventDefault; // older browsers, IE
        oldonmousewheel2 = document.onmousewheel;
        document.onmousewheel = preventDefault; // older browsers, IE
        
        oldontouchmove = window.ontouchmove;
        window.ontouchmove = preventDefault; // mobile
        
        oldonkeydown = document.onkeydown;
        document.onkeydown = preventDefaultForScrollKeys;
        isDisabled = true;
    })();
}

// document.addEventListener("scroll", yScroll);  //control topbtn'opacity
document.addEventListener('DOMMouseScroll', wheel, true); //firefox
document.addEventListener('mousewheel', wheel, true); //chrome, IE




/** Slider Js  */


// var slides=document.querySelectorAll('.slide'),tl= new TimelineLite({paused:true});
//     for(var i=slides.length;i--;){
//       var D=document.createElement('div'); D.className='Dot'; D.id='Dot'+i;
//       D.addEventListener('scroll',function(){ tl.seek(this.id).pause() });
//       document.getElementById('Dots').appendChild(D);
//       tl.add('Dot'+i)
//       if(i>0){

//         if(i!=slides.length-1){tl.addPause()}
//         tl.to(slides[i],0.9,{scale:.9,ease:Back.easeOut})
//         .to(slides[i],0.9,{xPercent:-92},'L'+i)
//         .from(slides[i-1],0.9,{xPercent:92},'L'+i)
//         .to('#Dot'+i,0.5,{backgroundColor:'rgba(255,255,255,0.2)'},'L'+i)
//         .set(slides[i],{zIndex:1-i}).set(slides[i-1],{zIndex:slides.length})
//         .from(slides[i-1],0.9,{scale:.9,ease:Back.easeIn})
//       };
//     };
//     function GO(e){
//       var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
//       if(SD<0){tl.play()}else{tl.reverse()};
//     };

//     document.addEventListener("mousewheel",GO);
//     document.addEventListener("DOMMouseScroll",GO);
//     document.getElementById('nextBtn').addEventListener("click",function(){GO(-1)});
//     document.getElementById('prevtBtn').addEventListener("click",function(){GO(1)});



// {
//     class Uncover {
//         constructor(el, options) {
//             this.DOM = {el: el};
//             this.options = {
//                 // initially covered.
//                 covered: true,
//                 // total number of slices.
//                 slicesTotal: 3,
//                 // slices color.
//                 slicesColor: '#fff',
//                 // 'vertical' || 'horizontal'.
//                 orientation: 'vertical',
//                 // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
//                 // need to define for both show and hide methods.
//                 // e.g. animate the slices in from left and hide them to the right side (for a horizontal layout)
//                 slicesOrigin: {
//                     show: 'bottom',
//                     hide: 'bottom'
//                 }
//             };
//             Object.assign(this.options, options);
//             this.isCovered = this.options.covered;
//             this.layout();
//             if ( !this.isCovered ) {
//                 this.show();
//             }
//         }
//         layout() {
//             this.DOM.el.classList.add('uncover');
//             let inner = '';
//             inner += `<div class="uncover__img" style='background-image: ${this.DOM.el.style.backgroundImage}'></div>
//             <div class="uncover__slices uncover__slices--${this.options.orientation}">`;
            
//             for (let i = 0; i <= this.options.slicesTotal - 1; ++i) {
//                 inner += `<div class="uncover__slice" style="color:${this.options.slicesColor}"></div>`;
//             }
//             inner += `</div>`;
//             this.DOM.el.innerHTML = inner;
//             this.DOM.img = this.DOM.el.querySelector('.uncover__img');
//             this.DOM.slices = Array.from(this.DOM.el.querySelectorAll('.uncover__slice'));
//             this.slicesTotal = this.DOM.slices.length;
//         }
//         show(animation = false, animationSettings = {}) {
//             if ( !this.isCovered ) return;
//             return this.toggle(animation,animationSettings);
//         }
//         hide(animation = false, animationSettings = {}) {
//             if ( this.isCovered ) return;
//             return this.toggle(animation,animationSettings);
//         }
//         toggle(animation,animationSettings) {
//             this.isCovered = !this.isCovered;
//             if ( !animation ) {
//                 this.DOM.slices.forEach((slice) => {
//                     slice.style.transform = !this.isCovered ? 
//                     this.options.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)' :
//                     'none';
//                 });
//             }
//             else {
//                 let settings = {
//                     slices: {
//                         targets: this.DOM.slices,
//                         duration: 800,
//                         delay: (_,i) => i*80,
//                         easing: 'easeInOutQuart',
//                         translateX: this.options.orientation === 'vertical' ? '0%' : 
//                         !this.isCovered ? 
//                         this.options.slicesOrigin.show === 'right' ? '100%' : '-100%' : 
//                         this.options.slicesOrigin.hide === 'right' ? ['100%','0%'] : ['-100%','0%'],
                        
//                         translateY: this.options.orientation === 'vertical' ? 
//                         !this.isCovered ? 
//                         this.options.slicesOrigin.show === 'bottom' ? '100%' : '-100%' :
//                         this.options.slicesOrigin.hide === 'bottom' ? ['100%','0%'] : ['-100%','0%']
//                         : '0%'
//                     },
//                     image: {
//                         targets: this.DOM.img
//                     }
//                 };
//                 Object.assign(settings.slices, animationSettings.slices);
//                 Object.assign(settings.image, animationSettings.image);
                
//                 anime.remove(this.DOM.slices);
//                 anime.remove(this.DOM.img);
                
//                 let promises = [anime(settings.slices).finished];
//                 if ( settings.image.duration ) {
//                     promises.push(anime(settings.image).finished);
//                 }
//                 return Promise.all(promises);
//             }
//         }
//     }
//     window.Uncover = Uncover;
// }


// {
//     // the settings for each one of the slides uncover instances.
//     const uncoverOpts = [
//         {
//             // total number of slices.
//             slicesTotal: 4,
//             // slices color.
//             slicesColor: '#111',
//             // 'vertical' || 'horizontal'.
//             orientation: 'vertical',
//             // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
//             slicesOrigin: {show: 'top', hide: 'bottom'}
//         },
//         {
//             slicesTotal: 7, 
//             slicesColor: '#111', 
//             orientation: 'horizontal', 
//             slicesOrigin:  {show: 'right', hide: 'right'}
//         },
//         {
//             slicesTotal: 9,
//             slicesColor: '#111',
//             orientation: 'vertical',
//             slicesOrigin:  {show: 'bottom', hide: 'bottom'}
//         },
//         {
//             slicesTotal: 5,
//             slicesColor: '#111',
//             orientation: 'horizontal',
//             slicesOrigin:  {show: 'left', hide: 'left'}
//         },
//         {
//             slicesTotal: 6,
//             slicesColor: '#111',
//             orientation: 'vertical',
//             slicesOrigin:  {show: 'bottom', hide: 'bottom'}
//         }
//     ];
    
//     class Slideshow {
//         constructor(el) {
//             this.DOM = {el: el};
//             this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
//             this.slidesTotal = this.DOM.slides.length;
//             this.current = 0;
//             this.uncoverItems = [];
//             this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
//             this.init();
//         }
//         init() {
//             this.isAnimating = true;
//             this.DOM.slides[this.current].classList.add('slide--current');
//             this.uncoverItems[this.current].show(true, {
//                 image: {
//                     duration: 800,
//                     delay: 350,
//                     easing: 'easeOutCubic',
//                     scale: [1.3,1]
//                 }
//             }).then(() => this.isAnimating = false);
//         }
//         navigate(pos) {
//             if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
//             this.isAnimating = true;
            
//             this.uncoverItems[this.current].hide(true).then(() => {
//                 this.DOM.slides[this.current].classList.remove('slide--current');
//                 this.current = pos;
                
//                 const newItem = this.uncoverItems[this.current];
//                 newItem.hide();
//                 this.DOM.slides[this.current].classList.add('slide--current');
//                 newItem.show(true, {
//                     image: {
//                         duration: 800,
//                         delay: 350,
//                         easing: 'easeOutCubic',
//                         scale: [1.3,1]
//                     }
//                 }).then(() => this.isAnimating = false);
//             });
//         }
//     }
    
//     // Preload all the images in the page..
//     imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
//         document.body.classList.remove('loading');
        
//         const slideshow = new Slideshow(document.querySelector('.slides'));
        
//         const pagination = document.querySelector('.pagination');
//         const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
//         triggers.forEach((trigger,pos) => {
//             if ( pos === 0 ) {
//                 trigger.classList.add('pagination__item--current');
//             }
//             trigger.addEventListener('click', () => {
//                 if ( slideshow.isAnimating ) return;
//                 slideshow.navigate(pos);
//                 pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
//                 trigger.classList.add('pagination__item--current');
//             })
//         });
        
//         document.addEventListener('keydown', (ev) => {
//             if ( slideshow.isAnimating ) return;
//             const keyCode = ev.keyCode || ev.which;
//             let newpos;
//             if ( keyCode === 37 ) {
//                 newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
//                 slideshow.navigate(newpos);
//             }
//             else if ( keyCode === 39 ) {
//                 newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
//                 slideshow.navigate(newpos);
//             }
//             else return;
//             pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
//             triggers[newpos].classList.add('pagination__item--current');
//         });
//     });
// }







/********************************************************************
 Another Slider JS
 ************************************************************/
(function(window) {

	'use strict';

	/**
	 * Helper vars and functions:
	 */
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	/**
	 * MLSlideshow obj.
	 */
	function MLSlideshow(el, options) {
		this.el = el;
		// Options/Settings.
		this.options = extend( {}, this.options );
		extend( this.options, options );

		// The slides
		this.slides = [].slice.call(this.el.querySelectorAll('.slide'));
		// Total slides.
		this.slidesTotal = this.slides.length;
		if( this.slidesTotal <= 1 ) return;
		// Current slide.
		this.current = this.options.startIdx || 0;
		// Slideshow dimensions:
		this.dimentions = {width : this.el.offsetWidth, height : this.el.offsetHeight};
		
		this._init();
	}

	/**
	 * Options.
	 */
	MLSlideshow.prototype.options = {
		// Starting position.
		startIdx : 0,
		// Layout configuration.
		// [layout name] : { out : {navigating out properties}, in : {navigating in properties} }
		// For some properties we can have a "next" and "prev" behavior which can be different for the two - navigating out/in to the right or left.
		// For the translationX/Y we can use percentage values (relative to the Slideshow element).
		layoutConfig : {
			layout1 : {
				out : {
					translateX : {
						next: '-100%', 
						prev: '100%'
					},
					rotateZ : {
						next: function(el, index) {
							return anime.random(-25, 0);
						}, 
						prev: function(el, index) {
							return anime.random(0, 25);
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 80
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 15);
							}, 
							prev: function(el, index) {
								return anime.random(-15, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 80
				}
			},
			layout2 : {
				out : {
					translateX : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					translateY : {
						next: function(el, index) {
							return anime.random(-50, 50) + '%';
						}, 
						prev: function(el, index) {
							return anime.random(-50, 50) + '%';
						}
					},
					opacity : 0,
					duration: 1200,
					easing : 'easeOutQuint',
					itemsDelay : 10
				},
				in : {
					resetProps : {
						translateX : {
							next: '100%', 
							prev: '-100%'
						},
						rotateZ : {
							next: function(el, index) {
								return anime.random(0, 90);
							}, 
							prev: function(el, index) {
								return anime.random(-90, 0);
							}
						},
						opacity : 0,
					},
					translateX : '0%',
					rotateZ : 0,
					opacity : 1,
					duration: 900,
					easing : 'easeOutExpo',
					itemsDelay : 30
				}
			},
			
			layout4 : {
				out : {
					translateY : {
						next: '60%',
						prev: '-60%'
					},
					opacity : 0,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50
				},
				in : {
					resetProps : {
						translateY : {
							next: '-60%',
							prev: '60%'
						},
						opacity : 0,
					},
					translateY : '0%',
					opacity : 1,
					duration: 700,
					easing : 'easeOutQuint',
					itemsDelay : 50,
					delay : 250
				}
			},
		}
	};

	/**
	 * Init.
	 */
	MLSlideshow.prototype._init = function() {
		var self = this,
			onPreload = function() {
				self.el.classList.add('slideshow--loaded');
				// Set class current to the current slide.
				self.slides[self.current].classList.add('slide--current');
			};

		// Preload all images.
		this._preload(onPreload);
		// Init/Bind events
		this._initEvents();
	};

	/**
	 * Init/Bind Events.
	 */
	MLSlideshow.prototype._initEvents = function() {
		var self = this;
		
		// Window resize.
		this.debounceResize = debounce(function(ev) {
			// Recalculate dimensions.
			self.dimentions = {width : self.el.offsetWidth, height : self.el.offsetHeight};
		}, 10);

		// Keyboard events.
		this.keyboardFn = function(ev) {
			var keyCode = ev.keyCode || ev.which;
			switch (keyCode) {
				case 37:
					self._navigate('prev');
					break;
				case 39:
					self._navigate('next');
					break;
			}
		};

		window.addEventListener('resize', this.debounceResize);
		this.el.addEventListener('keydown', this.keyboardFn);
	};

	/**
	 * Preload all images.
	 */
	MLSlideshow.prototype._preload = function(callback) {
		imagesLoaded(this.el, {background: true}, function() {
			if( typeof callback === 'function' ) { callback(); }
		});
	};

	/**
	 * Navigation.
	 */
	MLSlideshow.prototype._navigate = function(direction) {
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;

		var self = this,
			// Current slide.
			currentSlide = this.slides[this.current],
			// Layout name. Defaults to "layout1".
			currentLayout = currentSlide.getAttribute('data-layout') || 'layout1',
			currentTitle = currentSlide.querySelector('.slide__title');

		if( direction === 'next' ) {
			this.current = this.current < this.slidesTotal - 1 ? this.current + 1 : 0;
		}
		else {
			this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1;
		}

		var nextSlide = this.slides[this.current],
			nextLayout = nextSlide.getAttribute('data-layout'),
			nextTitle = nextSlide.querySelector('.slide__title');

		// Animate the nextSlide´s items in..
		var animateIn = function() {
			clearTimeout(self.navtime);

			var inItems = [].slice.call(nextSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
				inconfig = self.options.layoutConfig[nextLayout] !== undefined ? self.options.layoutConfig[nextLayout].in : self.options.layoutConfig['layout1'].in,
				inresetconfig = inconfig.resetProps,
				animeInProps = {
					targets: inItems,
					duration: inconfig.duration,
					easing: inconfig.easing,
					delay: function(el, index) {
						return direction === 'next' ? index * inconfig.itemsDelay : (inItems.length - 1 - index) * inconfig.itemsDelay;
					},
					complete: function() {
						self.isAnimating = false;
					}
				};

			// Configure the animation in properties.
			self._setAnimationProperties(animeInProps, inconfig, direction);
			// Reset before animating in:
			inItems.forEach(function(item, pos) {
				var transformStr = '';
				if( inresetconfig.translateX !== undefined ) {
					var tx = typeof inresetconfig.translateX === 'object' ? function() {
						return typeof inresetconfig.translateX[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateX[direction](item, pos), 'width') : self._getValuePercentage(inresetconfig.translateX[direction], 'width');
					} : self._getValuePercentage(inresetconfig.translateX, 'width');
					
					transformStr += ' translateX(' + (typeof tx === 'function' ? tx() : tx) + 'px)';
				}
				if( inresetconfig.translateY !== undefined ) {
					var ty = typeof inresetconfig.translateY === 'object' ? function() {
						return typeof inresetconfig.translateY[direction] === 'function' ? self._getValuePercentage(inresetconfig.translateY[direction](item, pos), 'height') : self._getValuePercentage(inresetconfig.translateY[direction], 'height');
					} : self._getValuePercentage(inresetconfig.translateY, 'height');
					transformStr += ' translateY(' + (typeof ty === 'function' ? ty() : ty) + 'px)';
				}
				if( inresetconfig.rotateZ !== undefined ) {
					var rot = typeof inresetconfig.rotateZ === 'object' ? function() {
						return typeof inresetconfig.rotateZ[direction] === 'function' ? inresetconfig.rotateZ[direction](item, pos) : inresetconfig.rotateZ[direction];
					} : inresetconfig.rotateZ;
					
					transformStr += ' rotateZ(' + (typeof rot === 'function' ? rot() : rot) + 'deg)';
				}
				if( inresetconfig.scale !== undefined ) {
					var s = typeof inresetconfig.scale === 'object' ? function() {
						return typeof inresetconfig.scale[direction] === 'function' ? inresetconfig.scale[direction](item, pos) : inresetconfig.scale[direction];
					} : inresetconfig.scale;
					
					transformStr += ' scale(' + (typeof s === 'function' ? s() : s) + ')';
				}
				if( transformStr !== '' ) {
					item.style.transform = item.style.WebkitTransform = transformStr;
				}
				if( inresetconfig.opacity !== undefined ) {
					item.style.opacity = inresetconfig.opacity;
				}
			});

			// Switch current class.
			nextSlide.classList.add('slide--current');
			// Animate next slide in.
			anime(animeInProps);
			// Animate next title in.
			self._animateTitle(nextTitle, 'in');
		};

		// Animate the currentSlide´s items out..
		var outItems = [].slice.call(currentSlide.querySelectorAll('.slide-imgwrap .slide__img-inner')),
			outconfig = this.options.layoutConfig[currentLayout] !== undefined ? this.options.layoutConfig[currentLayout].out : this.options.layoutConfig['layout1'].out,
			animeOutProps = {
				targets: outItems,
				duration: outconfig.duration,
				easing : outconfig.easing,
				delay: function(el, index) {
					return direction === 'next' ? index * outconfig.itemsDelay : (outItems.length - 1 - index) * outconfig.itemsDelay;
				},
				complete: function() {
					currentSlide.classList.remove('slide--current');
				}
			};

		// Configure the animation out properties.
		this._setAnimationProperties(animeOutProps, outconfig, direction);
		// Animate current slide out.
		anime(animeOutProps);
		// Animate current title out.
		this._animateTitle(currentTitle, 'out');
		// Animate the next items in..
		clearTimeout(this.navtime);
		this.navtime = setTimeout(animateIn, this.options.layoutConfig[nextLayout] !== undefined && this.options.layoutConfig[nextLayout].in.delay !== undefined ? this.options.layoutConfig[nextLayout].in.delay : 150 );
	};

	/**
	 * Sets the animation properties for anime.js.
	 */
	MLSlideshow.prototype._setAnimationProperties = function(props, config, direction) {
		var self = this;
		if( config.translateX !== undefined ) {
			props.translateX = typeof config.translateX === 'object' ? function(el, index) {
				return typeof config.translateX[direction] === 'function' ? self._getValuePercentage(config.translateX[direction](el, index), 'width') : self._getValuePercentage(config.translateX[direction], 'width');
			} : this._getValuePercentage(config.translateX, 'width');
		}
		if( config.translateY !== undefined ) {
			props.translateY = typeof config.translateY === 'object' ? function(el, index) {
				return typeof config.translateY[direction] === 'function' ? self._getValuePercentage(config.translateY[direction](el, index), 'width') : self._getValuePercentage(config.translateY[direction], 'height');
			} : this._getValuePercentage(config.translateY, 'height');
		}
		if( config.rotateZ !== undefined ) {
			props.rotateZ = typeof config.rotateZ === 'object' ? function(el, index) {
				return typeof config.rotateZ[direction] === 'function' ? config.rotateZ[direction](el, index) : config.rotateZ[direction];
			} : config.rotateZ;
		}
		if( config.scale !== undefined ) {
			props.scale = typeof config.scale === 'object' ? function(el, index) {
				return typeof config.scale[direction] === 'function' ? config.scale[direction](el, index) : config.scale[direction];
			} : config.scale;
		}
		if( config.opacity !== undefined ) {
			props.opacity = config.opacity;
		}
	};

	/**
	 * Animate the title in and out.
	 */
	MLSlideshow.prototype._animateTitle = function(titleEl, dir) {
		anime({
			targets: titleEl,
			opacity: dir === 'out' ? 0 : 1,
			duration: dir === 'out' ? 200 : 500,
			easing: 'easeOutExpo'
		});
	};

	/**
	 * Navigate to the next slide.
	 */
	MLSlideshow.prototype.next = function() {
		this._navigate('next');
	};

	/**
	 * Navigate to the previous slide.
	 */
	MLSlideshow.prototype.prev = function() {
		this._navigate('prev');
	};

	/**
	 * If "str" is a percentage value (e.g. 50%) it returns the calculation in px for that value (relative to the main Slideshow element).
	 */
	MLSlideshow.prototype._getValuePercentage = function(str, axis) {
		return typeof str === 'string' && str.indexOf('%') !== -1 ? parseFloat(str)/100*this.dimentions[axis] : str;
	};

	window.MLSlideshow = MLSlideshow;

})(window);


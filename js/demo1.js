
{
    class Uncover {
        constructor(el, options) {
            this.DOM = {el: el};
            this.options = {
                // initially covered.
                covered: true,
                // total number of slices.
                slicesTotal: 3,
                // slices color.
                slicesColor: '#fff',
                // 'vertical' || 'horizontal'.
                orientation: 'vertical',
                // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
                // need to define for both show and hide methods.
                // e.g. animate the slices in from left and hide them to the right side (for a horizontal layout)
                slicesOrigin: {
                    show: 'bottom',
                    hide: 'bottom'
                }
            };
            Object.assign(this.options, options);
            this.isCovered = this.options.covered;
            this.layout();
            if ( !this.isCovered ) {
                this.show();
            }
        }
        layout() {
            this.DOM.el.classList.add('uncover');
            let inner = '';
            inner += `<div class="uncover__img" style='background-image: ${this.DOM.el.style.backgroundImage}'></div>
                      <div class="uncover__slices uncover__slices--${this.options.orientation}">`;
            for (let i = 0; i <= this.options.slicesTotal - 1; ++i) {
                inner += `<div class="uncover__slice" style="color:${this.options.slicesColor}"></div>`;
            }
            inner += `</div>`;
            this.DOM.el.innerHTML = inner;
            this.DOM.img = this.DOM.el.querySelector('.uncover__img');
            this.DOM.slices = Array.from(this.DOM.el.querySelectorAll('.uncover__slice'));
            this.slicesTotal = this.DOM.slices.length;
        }
        show(animation = false, animationSettings = {}) {
            if ( !this.isCovered ) return;
            return this.toggle(animation,animationSettings);
        }
        hide(animation = false, animationSettings = {}) {
            if ( this.isCovered ) return;
            return this.toggle(animation,animationSettings);
        }
        toggle(animation,animationSettings) {
            this.isCovered = !this.isCovered;
            if ( !animation ) {
                this.DOM.slices.forEach((slice) => {
                    slice.style.transform = !this.isCovered ? 
                                                this.options.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)' :
                                                'none';
                });
            }
            else {
                let settings = {
                    slices: {
                        targets: this.DOM.slices,
                        duration: 800,
                        delay: (_,i) => i*80,
                        easing: 'easeInOutQuart',
                        translateX: this.options.orientation === 'vertical' ? '0%' : 
                                                                            !this.isCovered ? 
                                                                                this.options.slicesOrigin.show === 'right' ? '100%' : '-100%' : 
                                                                                this.options.slicesOrigin.hide === 'right' ? ['100%','0%'] : ['-100%','0%'],
                                                                              
                        translateY: this.options.orientation === 'vertical' ? 
                                                                            !this.isCovered ? 
                                                                                this.options.slicesOrigin.show === 'bottom' ? '100%' : '-100%' :
                                                                                this.options.slicesOrigin.hide === 'bottom' ? ['100%','0%'] : ['-100%','0%']
                                                                            : '0%'
                    },
                    image: {
                        targets: this.DOM.img
                    }
                };
                Object.assign(settings.slices, animationSettings.slices);
                Object.assign(settings.image, animationSettings.image);
                
                anime.remove(this.DOM.slices);
                anime.remove(this.DOM.img);
                
                let promises = [anime(settings.slices).finished];
                if ( settings.image.duration ) {
                    promises.push(anime(settings.image).finished);
                }
                return Promise.all(promises);
            }
        }
    }
    window.Uncover = Uncover;
}



/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 4,
            // slices color.
            slicesColor: '#111',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'bottom'}
        },
        {
            slicesTotal: 7, 
            slicesColor: '#111', 
            orientation: 'horizontal', 
            slicesOrigin:  {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 9,
            slicesColor: '#111',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 5,
            slicesColor: '#111',
            orientation: 'horizontal',
            slicesOrigin:  {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 6,
            slicesColor: '#111',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        }
    ];

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.current = 0;
            this.uncoverItems = [];
            this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
            this.init();
        }
        init() {
            this.isAnimating = true;
            this.DOM.slides[this.current].classList.add('slide--current');
            this.uncoverItems[this.current].show(true, {
                image: {
                    duration: 800,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            }).then(() => this.isAnimating = false);
        }
        navigate(pos) {
            if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
            this.isAnimating = true;

            this.uncoverItems[this.current].hide(true).then(() => {
                this.DOM.slides[this.current].classList.remove('slide--current');
                this.current = pos;

                const newItem = this.uncoverItems[this.current];
                newItem.hide();
                this.DOM.slides[this.current].classList.add('slide--current');
                newItem.show(true, {
                    image: {
                        duration: 800,
                        delay: 350,
                        easing: 'easeOutCubic',
                        scale: [1.3,1]
                    }
                }).then(() => this.isAnimating = false);
            });
        }
    }
    
    // Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
        document.body.classList.remove('loading');
        
        const slideshow = new Slideshow(document.querySelector('.slides'));
        
        const pagination = document.querySelector('.pagination');
        const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
        triggers.forEach((trigger,pos) => {
            if ( pos === 0 ) {
                trigger.classList.add('pagination__item--current');
            }
            trigger.addEventListener('click', () => {
                if ( slideshow.isAnimating ) return;
                slideshow.navigate(pos);
                pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
                trigger.classList.add('pagination__item--current');
            })
        });
    
        document.addEventListener('keydown', (ev) => {
            if ( slideshow.isAnimating ) return;
            const keyCode = ev.keyCode || ev.which;
            let newpos;
            if ( keyCode === 37 ) {
                newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
                slideshow.navigate(newpos);
            }
            else if ( keyCode === 39 ) {
                newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
                slideshow.navigate(newpos);
            }
            else return;
            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
            triggers[newpos].classList.add('pagination__item--current');
        });
    });
}
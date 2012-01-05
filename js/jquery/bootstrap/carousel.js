!function( $ ){

  "use strict"

  var Carousel = function( content, options ) {
    var _this = this;
    this.settings = $.extend({}, $.fn.carousel.defaults, options);
    this.wrapper = $('.carousel', content);
    if (this.settings.carousel == 'horizontal') {
      if (this.wrapper[0].offsetWidth > content.offsetWidth) {
        if (this.settings.wrap) {
          this.wrapper.css('width', this.wrapper[0].offsetWidth*2).append(this.wrapper.html());
        }
        this.scrollable = true;
        this.itemSize = $('.carousel-item:eq(0)', content)[0].offsetWidth;
        this.viewableSize = content.offsetWidth;
        this.wholeSize = parseInt(this.wrapper.css('width'));
      }
    } else {
      if (this.wrapper[0].offsetHeight > content.offsetHeight) {
        if (this.settings.wrap) {
          this.wrapper.css('height', this.wrapper[0].offsetHeight*2).append(this.wrapper.html());
        }
        this.scrollable = true;
        this.itemSize = $('.carousel-item:eq(0)', content)[0].offsetHeight;
        this.viewableSize = content.offsetHeight;
        this.wholeSize = parseInt(this.wrapper.css('height'));
      }
    }
    $(content).parent().find('.carousel-forward').click(function() {_this.forward.call(_this);});
    $(content).parent().find('.carousel-backward').click(function() {_this.backward.call(_this);});
  }

  Carousel.prototype = {
    forward: function() {
      scroll.call(this, this.settings.step);
    },
    backward: function() {
      scroll.call(this, - this.settings.step);
    }
  }

  /* CAROUSEL PRIVATE FUNCTION
   * ========================= */
  function scroll(step) {
    if (! this.scrollable) return;
    if (this.settings.wrap) {
      
    } else {
      var posi = pos.call(this) - step * this.itemSize;
      pos.call(this, posi);
    }
  }

  function pos(value) {
    return this.settings.carousel == 'horizontal' ?
      value ? this.wrapper.css('left', value) : parseInt(this.wrapper.css('left')) :
      value ? this.wrapper.css('top', value) : parseInt(this.wrapper.css('top'));
  }

  /* CAROUSEL PLUGIN DEFINITION
   * ========================== */
  $.fn.carousel= function ( options ) {
    if (options === true) {
      return this.data('Carousel');
    }
    return this.each(function() {
      if ( typeof options == 'string' ) {
        return $(this).data('Carousel')[options]();
      }
      $(this).data('Carousel', new Carousel(this, options || $(this).data()));
    });
  }

  $.fn.carousel.defaults = {
    carousel: 'horizontal',
    wrap: false,
    step: 1
  }

  /* APPLY TO STANDARD CAROUSEL ELEMENTS
   * =================================== */

  $(function () {
    $('body [data-carousel]').carousel();
  })

}( window.jQuery );

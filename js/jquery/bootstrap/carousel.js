!function( $ ){

  "use strict"

  var Carousel = function( content, options ) {
    var _this = this;
    this.settings = $.extend({}, $.fn.carousel.defaults, options);
    this.wrapper = $('.carousel', content);
    this.forwardBtn = $(content).parent().find('.carousel-forward');
    this.backwardBtn = $(content).parent().find('.carousel-backward');
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
    this.forwardBtn.click(function() {_this.forward.call(_this);});
    this.backwardBtn.click(function() {_this.backward.call(_this);});
  }

  Carousel.prototype = {
    forward: function() {
      scroll.call(this, this.settings.step);
      return false;
    },
    backward: function() {
      scroll.call(this, - this.settings.step);
      return false;
    }
  }

  /* CAROUSEL PRIVATE FUNCTION
   * ========================= */
  function scroll(step) {
    if (! this.scrollable) return;
    var _this = this;
    if (this.settings.wrap) {
      if (step < 0 && pos.call(this) == 0)
        pos.call(this, - this.wholeSize / 2);
      if (step > 0 && this.viewableSize - pos.call(this) == this.wholeSize)
        pos.call(this, this.viewableSize - this.wholeSize / 2);
    }
    var posi = pos.call(this) - step * this.itemSize;
    scrollTo.call(this, posi, function() {
      if (_this.settings.wrap) return;
      posi == 0 ? _this.backwardBtn.addClass('disabled').attr('disabled', true) : _this.backwardBtn.removeClass('disabled').attr('disabled', false);
      posi <= _this.viewableSize - _this.wholeSize ? _this.forwardBtn.addClass('disabled').attr('disabled', true) : _this.forwardBtn.removeClass('disabled').attr('disabled', false);
    });
  }

  function pos(value) {
    return this.settings.carousel == 'horizontal' ?
      value!=null ? this.wrapper.css('left', value) : parseInt(this.wrapper.css('left')) :
      value!=null ? this.wrapper.css('top', value) : parseInt(this.wrapper.css('top'));
  }

  function scrollTo(value, callback) {
    return this.settings.carousel == 'horizontal' ?
      this.wrapper.animate({'left': value}, 'slow', 'easeOutCubic', callback) :
      this.wrapper.animate({'top': value}, 'slow', 'easeOutCubic', callback);
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

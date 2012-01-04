!function( $ ){

  "use strict"

  var Carousel = function( content, opitons ) {
    this.settings = $.extend({}, $.fn.carousel.defaults, options);
    this.items = $('carousel-item', content);
    this.wrapper = $('.carousel', content);

    if (this.settings.wrap) {
      if (this.settings.carousel == 'horizontal') {
        this.itemSize = this.items.eq(0)[0].offsetWidth + this.items.eq(0).css('marginLeft') + this.items.eq(0).css('marginRight') + this.items.eq(0).css('paddingLeft') + this.items.eq(0).css('paddingRight');
        this.wrapperSize = this.wrapper.offsetWidth;
      } else {
        this.itemSize = this.items.eq(0)[0].offsetHeight + this.items.eq(0).css('marginTop') + this.items.eq(0).css('marginBottom') + this.items.eq(0).css('paddingTop') + this.items.eq(0).css('paddingBottom');
        this.wrapperSize = this.wrapper.offsetHeight;
      }
      if (this.wrapperSize > this.itemSize * this.items.length) {
        this.wrapper.append(this.items.html());
      }
    }
  }

  /* CAROUSEL PLUGIN DEFINITION
   * ========================== */

  $.fn.carousel= function ( options ) {
    if (options === true) {
      return this.data('carousel');
    }

    return this.each(function() {
      if ( typeof options == 'string' ) {
        return $(this).data('carousel')[options]();
      }
      $(this).data('carousel', new Carousel(this, options || $(this).data()));
    });
  }

  $.fn.carousel.defaults = {
    carousel: 'horizontal',
    dir: 'ltr',
    wrap: false,
    scroll: 1
  }

  /* APPLY TO STANDARD CAROUSEL ELEMENTS
   * =================================== */

  $(function () {
    $('body [data-carousel]').carousel();
  })

}( window.jQuery || window.ender );

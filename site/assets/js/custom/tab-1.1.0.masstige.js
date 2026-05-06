/***
  MASSTIGE SCRIPT LIBRARY

  Tab Active Script
  By Masstige Publishing Team

  Version : 1.1.0
  Last updated : 2021-06-15
  Git : https://github.com/masstige-publishing/library
***/

$(document).ready(function () {
  var $tab = $('[data-tab]');

  $tab.each(function () {
    var STATE = $(this).data('tab'),
      MODE = $(this).data('tab-mode') === undefined || $(this).data('tab-mode') === '' ? 'js' : $(this).data('tab-mode'),
      ACTIVE_CLASS = $(this).data('tab-active') === undefined || $(this).data('tab-active') === '' ? 'on' : $(this).data('tab-active'),
      INITIAL_INDEX = $(this).data('tab-active') === undefined || $(this).data('tab-index') === '' ? 0 : $(this).data('tab-index'),
      $ITEMS = $(this).children('[data-tab-header]').find('[data-tab-item]'),
      $CONTENTS = $(this).children('[data-tab-body]').children('[data-tab-content]'),
      PLUGIN = {
        WOW: (INITIAL_INDEX = $(this).data('tab-index') === '' ? 0 : $(this).data('tab-index')),
      };

    /* data-tab 값의 false 여부 확인 */
    if (STATE !== false) {
      switch (MODE) {
        case 'js':
          $ITEMS.eq(INITIAL_INDEX).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
          $CONTENTS.eq(INITIAL_INDEX).eq(INITIAL_INDEX).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
          $CONTENTS.eq(INITIAL_INDEX).siblings().css({
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
          });

          break;

        case 'css':
          $ITEMS.eq(INITIAL_INDEX).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
          $CONTENTS.eq(INITIAL_INDEX).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);

          break;

        default:
          break;
      }

      $ITEMS.on('click', function(e){
        e.preventDefault(); // A 태그인 경우 이벤트 막기.

        var $this = $(this),
            activeIndex = $this.data('tab-item') == "" ? $this.index() : $this.data('tab-item');


        if ( $this.parent('[data-tab-header]').length > 0 ) {
          $this.addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
        } else {
          activeIndex = $this.parents('[data-tab-header]').children().has($this).index();

          $this.parents('[data-tab-header]').find('[data-tab-item]').eq(activeIndex).addClass(ACTIVE_CLASS);
          $this.parents('[data-tab-header]').find('[data-tab-item]').not(':eq('+ activeIndex +')').removeClass(ACTIVE_CLASS);
        }

        switch (MODE) {
          case 'js':
            if ( $this.parent('[data-tab-header]').length > 0 ) {
              activeIndex = $this.data('tab-item') == "" ? $this.index() : $this.data('tab-item');
            } else {
              activeIndex = $this.data('tab-item') == "" ? $this.parents('[data-tab-header]').children().has($this).index() : $this.data('tab-item');
            }
            

            //console.log(activeIndex, $this.index());

            $CONTENTS.eq(activeIndex).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);
            $CONTENTS.eq(activeIndex).css({
              height: 'auto',
              visibility: 'visible',
              overflow: 'visible',
            }).siblings().css({
              height: '0',
              visibility: 'hidden',
              overflow: 'hidden',
            });

            break;
          case 'css':
            $CONTENTS.eq(activeIndex).addClass(ACTIVE_CLASS).siblings().removeClass(ACTIVE_CLASS);

            break;
          default:

            break;
        }
      });
    }
  });
});

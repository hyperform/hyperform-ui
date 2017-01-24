'use strict';


import $ from 'jquery';
import 'jquery-ui/ui/widgets/selectmenu';


/**
 * enhance a button with the jQuery UI button widget
 */
export default function(ctx=document) {
  return $('select', ctx).each(function() {
    if (this.className.search('hfui-enhanced') > -1) {
      /* prevent double handling */
      return;
    }

    this.className += ' hfui-enhanced';

    $(this).selectmenu();
  });
}

'use strict';


import $ from 'jquery';
import 'jquery-ui/ui/widgets/button';


/**
 * enhance a button with the jQuery UI button widget
 */
export default function(ctx=document) {
  return $('[type="submit"],[type="reset"],[type="button"],button', ctx).each(function() {
    if (this.className.search('hfui-enhanced') > -1) {
      /* prevent double handling */
      return;
    }

    this.className += ' hfui-enhanced';

    $(this).button();
  });
}

'use strict';


import $ from 'jquery';
import 'jquery-ui/ui/widgets/spinner';


var styles_injected = false;

/* remove spinners, b/c we create one here.
 * See http://stackoverflow.com/a/23374725/113195 */
function inject_styles() {
  if (styles_injected) { return; }
  styles_injected = true;

  const style = document.createElement('style');

  style.className = 'hfui-styles';
  /* WebKit :(. See https://davidwalsh.name/add-rules-stylesheets */
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  try {
    style.sheet.insertRule('[type="number"]{-moz-appearance:textfield}', 0);
  } catch(e) {}
  try {
    style.sheet.insertRule('[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}', 1);
  } catch(e) {}
}


/**
 * enhance a button with the jQuery UI button widget
 */
export default function(ctx=document) {
  inject_styles();

  return $('[type="number"]', ctx).each(function() {
    if (this.className.search('hfui-enhanced') > -1) {
      /* prevent double handling */
      return;
    }

    this.className += ' hfui-enhanced';

    $(this).spinner();
  });
}

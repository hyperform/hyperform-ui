'use strict';


import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';


/**
 * replace a range input with the jQuery UI slider widget
 */
export default function(ctx=document) {
  return $('[type="range"]', ctx).each(function() {
    if (this.className.search('hfui-hidden') > -1) {
      /* prevent double handling */
      return;
    }

    this.className += ' hfui-hidden';

    const min  = parseFloat(this.getAttribute('min')) || 0;
    const max  = parseFloat(this.getAttribute('max')) || 100;
    const step = parseFloat(this.getAttribute('step')) || 1;

    /* normalize the default value, if yet unchanged. Firefox and spec say
     * middle of range, Chrome et al. say `min`. We follow the spec. */
    if (this.defaultValue === '' && ! this.value) {
      this.value = min + (max > min? (max - min)/2 : min);
    }

    const $widget = $('<div>', {
      'class': 'hfui-widget hfui-range',
    });

    $(this)
      /* disallow direct interaction */
      .hide()
      /* notify the widget, if the value of the original input changed under
       * the hood */
      .on('change', () => {
        $widget.slider('value', this.value);
      })
      /* move the focus on from the hidden input to the widget */
      .on('focus', () => {
        $widget.find('.ui-slider-handle').focus();
      });

    $widget
      .slider({
        animate: true,
        min, max, step,
        disabled: this.disabled,
        /* this is non-standard, but apparently the way Firefox does it */
        orientation: this.getAttribute('orient') || 'horizontal',
        value: parseFloat(this.value) || 0,
        slide: (event, { value }) => {
          this.value = value;
        },
      })
      /* insert before original input, because the Hyperform error messages are
       * appended after it. This way it appears as if they belong to the
       * widget. */
      .insertBefore(this);
  });
}

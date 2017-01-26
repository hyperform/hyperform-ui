'use strict';


import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';


function string_to_date(string) {
  if (! /^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/.test(string)) {
    return null;
  }
  const date = new Date(0);
  date.setUTCFullYear(Number(RegExp.$1));
  date.setUTCMonth(Number(RegExp.$2) - 1, Number(RegExp.$3));
  return date;
}


/**
 * replace a date input with the jQuery UI datepicker widget
 */
export default function(ctx=document) {
  return $('[type="date"]', ctx).each(function() {
    if (this.className.search('hfui-hidden') > -1) {
      /* prevent double handling */
      return;
    }

    this.className += ' hfui-hidden';

    const defaultDate = this.valueAsDate;
    const dp_options = {
      altField: this,
      altFormat: 'yy-mm-dd',
      changeMonth: true,
      changeYear: true,
      yearRange: 'c-100:c+100',
      maxDate: string_to_date(this.getAttribute('max')),
      minDate: string_to_date(this.getAttribute('min')),
    };

    const $widget = $('<input>', {
        'class': 'hfui-widget hfui-date ui-widget ui-widget-content ui-corner-all',
        type: 'text',
        value: $.datepicker.formatDate($.datepicker.regional[''].dateFormat,
                                       defaultDate),
      })
      .datepicker(dp_options);

    $widget[0].readOnly = this.readOnly;
    $widget[0].disabled = this.disabled;

    $(this)
      /* disallow direct interaction */
      .hide()
      /* notify the widget, if the value of the original input changed under
       * the hood */
      .on('change', () => {
        $widget.datepicker('value', this.value);
      })
      /* move the focus on from the hidden input to the widget */
      .on('focus', () => {
        $widget.datepicker('show');
      });

    $widget
      .on('change', () => {
        if (! this.readOnly && ! this.disabled) {
          if (! $widget[0].value) {
            this.value = '';
          }
        }
      })
      /* insert before original input, because the Hyperform error messages are
       * appended after it. This way it appears as if they belong to the
       * widget. */
      .insertBefore(this);
  });
}

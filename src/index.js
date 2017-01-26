'use strict';


import button from './type/button';
import checkbox from './type/checkbox';
import date from './type/date';
import number from './type/number';
import radio from './type/radio';
import range from './type/range';
import select from './type/select';
import time from './type/time';


export default function hfui(ctx=document) {
  button(ctx);
  checkbox(ctx);
  date(ctx);
  number(ctx);
  radio(ctx);
  range(ctx);
  select(ctx);
  time(ctx);
}

/* until I can configure Webpack to do that automatically: */
window.hfui = hfui;

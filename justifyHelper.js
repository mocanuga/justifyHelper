/**
 * Created with IntelliJ IDEA.
 * User: mocanuga
 * Date: 4/23/14
 * Time: 11:35 AM
 * To change this template use File | Settings | File Templates.
 */
/* global jQuery */
;(function ($) {
    'use strict';
    $.each(['show', 'hide'], function () {
        var ev = arguments[0], 
            el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
}(jQuery));
;(function ($, w) {
    'use strict';
    $.fn.justifyHelper = function () {
        var container = this,
            items = container.children().not('.placeholder'),
            itemsCount = items.length,
            placeholder = items.first().clone().empty().addClass('placeholder'),
            widths = function () {
                var containerWidth = container.width(),
                    itemWidth = items.outerWidth(true),
                    perRow = Math.floor(containerWidth / itemWidth),
                    rowCount = Math.floor(itemsCount / perRow),
                    onLastRow = itemsCount - (perRow * rowCount);
                return {perRow: perRow, onLastRow: onLastRow};
            },
            justify = function () {
                var rowInfo = widths(),
                    count = rowInfo.perRow - rowInfo.onLastRow,
                    i = 0, filler = '';
                container.find('.placeholder').remove();
                if (rowInfo.perRow != rowInfo.onLastRow && rowInfo.onLastRow > 0) {
                    for (;i < count;i += 1) {
                        filler += placeholder[0].outerHTML + '\r\n';
                    }
                    container.append(filler);
                }
                return false;
            };
        container.add(container.parent())
            .on('show', function() {
                justify();
            });
        $(w).resize(function () {
            justify();
        });
        justify();
    };
}(jQuery, window));

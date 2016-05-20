
angular.module('nimble.filters', [])

.filter('dateFormat', [
    '$filter', function ($filter) {
        return function (input, format) {
            if (input != null) {
                var date = new Date(parseInt(input.substr(6)));
                return $filter('date')(date, format);
            }
            else
                return '-';
        };
    }
])
.filter('ApprovalStatusFormat', [
'$filter', function ($filter) {
    return function (input, format) {
        if (input == 1) {
            return 'Aprovado';
        }
        else
            return 'Pendente';
    };
}
])
.filter('momentFormat', [
    '$filter', function ($filter) {
        return function (input, format) {
            if (input != null) {
                return moment(input).locale("pt-br").format(format);
            }
            else
                return '-';
        };
    }
])
.filter('timeago', function () {
    return function (input, p_allowFuture) {

        if (input != null) {
            var substitute = function (stringOrFunction, number, strings) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                var value = (strings.numbers && strings.numbers[number]) || number;
                return string.replace(/%d/i, value);
            },

                nowTime = (new Date()).getTime(),
                date = (moment(input).toDate()).getTime(),           // (new Date(parseInt(input.substr(6)))).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || true,
                strings = {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "atrasado",
                    suffixFromNow: "restantes",
                    seconds: "menos de um minuto",
                    minute: "cerca de um minuto",
                    minutes: "%d minutos",
                    hour: "cerca de uma hora",
                    hours: "cerca %d horas",
                    day: "um dia",
                    days: "%d dias",
                    month: "cerca de um mês",
                    months: "%d mêses",
                    year: "cerca de um ano",
                    years: "%d ano(s)"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ? " " : strings.wordSeparator,

                // var strings = this.settings.strings;
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;

            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);

            return $.trim([prefix, words, suffix].join(separator));
        }
        else
            return '-';
    }
});

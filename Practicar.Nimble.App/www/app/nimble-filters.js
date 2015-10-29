
angular.module('nimble.filters', [])

.filter('cmdate', [
    '$filter', function ($filter) {
        return function (input, format) {
            var date = new Date(parseInt(input.substr(6)));
            return $filter('date')(date, format);
        };
    }
]);

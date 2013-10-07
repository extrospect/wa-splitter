'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm) {
            elm.text(version);
        };
    }])

    .directive('waSplitter', [function () {
        return {
            restrict: 'E',
            template: '<div>' +
                '<div data-ng-repeat="regionrow in regionProps.regions">' +
                    '<div data-ng-repeat="region in regionrow">' +
                        '<div data-wa-content="{{region}}"></div>' +
                        '<div data-ng-hide="$last" class="wa-splitter-handle"></div>' +
                    '</div>' +
                '<div data-ng-hide="$last" class="wa-splitter-handle"></div>' +
                '</div>',
            controller: function ($scope) {
                $scope.regionProps = {
                    regions: []
                };

                $scope.addRegion = function (html, rowIndex) {
                    var regions = $scope.regionProps.regions || [];

                    rowIndex = rowIndex || 0;
                    regions[rowIndex] = regions[rowIndex] || [];

                    regions[rowIndex].push(html);
                };
            }
        }
            ;
    }])

    .
    directive('waContent', ['$compile', function ($compile) {
        return {
            link: function ($scope, $element, $attrs) {
                var onContentChanged = function (content) {
                    var strippedContent,
                        linkFn,
                        el;

                    strippedContent = (content || '').replace(/^'/, '');
                    strippedContent = strippedContent.replace(/'$/, '');

                    try {
                        linkFn = $compile(strippedContent);
                    } catch (ex) {
                    }

                    if (linkFn) {
                        el = linkFn($scope);
                        $element.children().remove();
                        $element.append(el);
                    }
                };

                onContentChanged($attrs.waContent);
                $scope.$watch(function () {
                    return $attrs.waContent;
                }, function (value) {
                    onContentChanged(value);
                });
            }
        };
    }]);

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
                '<div data-ng-repeat="regionlist in regions">' +
                '<div data-ng-repeat="region in regionlist" data-wa-content="region"></div>' +
                '</div>' +
                '</div>',
            controller: function ($scope) {
                $scope.regionProps = {
                    regions: []
                };

                $scope.addRegion = function (html, rowIndex) {
                    rowIndex = rowIndex || 0;
                    $scope.regionProps.regions[rowIndex] = $scope.regionProps.regions[rowIndex] || [];
                    $scope.regionProps.regions[rowIndex].push(html);
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
                        $element.innerHTML = '';
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

'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    beforeEach(module('myApp.directives'));

    describe('app-version', function () {
        it('should print current version', function () {
            module(function ($provide) {
                $provide.value('version', 'TEST_VER');
            });
            inject(function ($compile, $rootScope) {
                var element = $compile('<span data-app-version></span>')($rootScope);
                expect(element.text()).toEqual('TEST_VER');
            });
        });
    });

    describe('wa-splitter', function () {
        describe('given cogito ergo sum', function () {
            describe('when the directive\'s tag is compiled', function () {
                var directiveTag = '<wa-splitter></wa-splitter>',
                    html = getHtml('a'),
                    html2 = getHtml('b'),
                    html3 = getHtml('c'),
                    html4 = getHtml('d'),
                    compiledHtml,
                    compiledHtml2,
                    $scope,
                    element,
                    $compile,
                    $rootScope;

                beforeEach(function () {
                    inject(function (_$compile_, _$rootScope_) {
                        $compile = _$compile_;
                        $rootScope = _$rootScope_;
                    });
                    $scope = $rootScope.$new();
                    element = $compile(directiveTag)($scope);
                });

                it('then it should transform the tag', function () {
                    expect(element.html()).not.toEqual(directiveTag);
                    expect(element.html()).not.toEqual('');
                });

                it('and it should provide an addRegionMethod on the scope', function () {
                    expect($scope.addRegion).toBeDefined();
                    expect($scope.addRegion).toEqual(jasmine.any(Function));
                });

                function countDisplayedSplitters(element) {
                    var visibleSplitters = 0,
                        i = 0,
                        len,
                        splitterHandles;

                    splitterHandles = element.getElementsByClassName('wa-splitter-handle');

                    for(len = splitterHandles.length; i < len; i++) {
                        if(splitterHandles[i].outerHTML.indexOf('display: none') === -1) {
                            visibleSplitters++;
                        }
                    }

                    return visibleSplitters;
                }

                function getHtml(content) {
                    return '<div>' + content + '</div>';
                }

                describe('and a region is added', function () {
                    beforeEach(function() {
                        $scope.addRegion(html);
                        compiledHtml = $compile(html)($rootScope);
                        $scope.$digest();
                    });

                    it('then it should render the result of compiling the supplied html',
                        function () {
                        expect(compiledHtml.html()).not.toEqual('');
                        expect(element.html()).toContain(compiledHtml[0].outerHTML);
                    });

                    // TODO: These checks might be better suited to the E2E API?
                    it('and it should not display a splitter handle', function() {
                        var splitterHandles,
                            i,
                            len;

                        splitterHandles = element[0].getElementsByClassName('wa-splitter-handle');

                        for(i = 0, len = splitterHandles.length; i < len; i++) {
                            expect(splitterHandles[i].outerHTML).toContain(
                                'display: none'/* check all splitters are being hidden */
                            );
                        }
                    });
                });

                describe('and two regions are added to the same row', function () {


                    beforeEach(function() {
                        $scope.addRegion(html);
                        compiledHtml = $compile(html)($rootScope);
                        $scope.addRegion(html2);
                        compiledHtml2 = $compile(html2)($rootScope);
                        $scope.$digest();
                    });

                    it('then it should render the result of compiling both pieces of html',
                        function () {
                        expect(compiledHtml.html()).not.toEqual('');
                        expect(compiledHtml2.html()).not.toEqual('');
                        expect(element.html()).toContain(compiledHtml[0].outerHTML);
                        expect(element.html()).toContain(compiledHtml2[0].outerHTML);
                    });

                    it('and it should render a single splitter handle between the regions', function() {
                        var visibleSplitters = countDisplayedSplitters(element[0]);

                        expect(visibleSplitters).toBe(1);
                    });
                });

                describe('and two regions are added to different rows', function () {
                    beforeEach(function() {
                        $scope.addRegion(html);
                        compiledHtml = $compile(html)($rootScope);
                        $scope.addRegion(html2, 1);
                        compiledHtml2 = $compile(html2)($rootScope);
                        $scope.$digest();
                    });

                    it('then it should render the result of compiling both pieces of html',
                        function () {
                            expect(compiledHtml.html()).not.toEqual('');
                            expect(compiledHtml2.html()).not.toEqual('');
                            expect(element.html()).toContain(compiledHtml[0].outerHTML);
                            expect(element.html()).toContain(compiledHtml2[0].outerHTML);
                        });

                    it('and it should render a single splitter handle between the regions', function() {
                        var visibleSplitters = countDisplayedSplitters(element[0]);

                        expect(visibleSplitters).toBe(1);
                    });
                });

                describe('and four regions are added across two rows', function () {
                    beforeEach(function() {
                        $scope.addRegion(html);
                        $scope.addRegion(html2);
                        $scope.addRegion(html3, 1);
                        $scope.addRegion(html4, 1);
                        $scope.$digest();
                    });

                    it('then it should render a three splitter handles between the regions', function() {
                        var visibleSplitters = countDisplayedSplitters(element[0]);

                        expect(visibleSplitters).toBe(3);
                    });
                });
            });
        });
    });

    describe('wa-content', function() {
        describe('given wa-content is applied as an attribute to a html element', function() {
            describe('when the value of wa-content is some valid html', function() {
                it('then the element\'s content should be set to the result of compiling the ' +
                    'value of wa-content', function() {
                    var contentHtml = '<span>Some content!</span>',
                        element,
                        compiledHtml;

                    inject(function ($compile, $rootScope) {
                        element = $compile(
                            '<div data-wa-content="\'' + contentHtml + '\'"></div>'
                        )($rootScope);
                        compiledHtml = $compile(contentHtml)($rootScope);

                        expect(element.html()).toContain(compiledHtml[0].outerHTML);
                    });
                })
            });
        });
    });
});

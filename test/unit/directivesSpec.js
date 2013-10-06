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

                it('then it should provide an addRegionMethod on the scope', function () {
                    expect($scope.addRegion).toBeDefined();
                    expect($scope.addRegion).toEqual(jasmine.any(Function));
                });

                describe('and a region is added', function () {
                    // TODO: Get this 'addRegion' method working correctly
                    xit('then it should render the result of compiling the supplied html', function () {
                        var html = '<div>some html</div>',
                            compiledHtml;

                        $scope.addRegion(html);
                        compiledHtml = $compile(html)($rootScope);
                        $scope.$digest();

                        expect(compiledHtml.html()).not.toEqual('');
                        expect(element.html()).toContain(compiledHtml.html());
                    });
                });
            });
        });
    });

    describe('wa-content', function() {
        describe('given wa-content is applied as an attribute to a html element', function() {
            describe('when the value of wa-content is some valid html', function() {
                it('then the element\'s content should be set to the result of compiling the value of wa-content', function() {
                    var contentHtml = '<span>Some content!</span>',
                        element,
                        compiledHtml;

                    inject(function ($compile, $rootScope) {
                        element = $compile('<div data-wa-content="\'' + contentHtml + '\'"></div>')($rootScope);
                        compiledHtml = $compile(contentHtml)($rootScope);
                        expect(element.html()).toContain(compiledHtml.html());
                    });
                })
            });
        });
    });
});

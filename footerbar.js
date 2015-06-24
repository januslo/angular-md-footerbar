(function () {
angular.module('footerBar', []);
angular.module('footerBar').directive('footerBar', function() {
    return {
        restrict: 'E',
        scope: {
            vm: '=items',
            barcolor: '@barcolor'
        },
        compile: function(element, attrs) {
            if (!attrs.barcolor) { attrs.barcolor = 'blue'; }
        },
        template: '<div id="footerbar" ng-controller=\'didWeHaveAnIcon as plz\' >' +
            '<table class="table" id="footertable" ng-cloak>' +
                '<tbody>' +
                    '<tr>' +
                        '<td ng-repeat="item in vm track by $index"' +
                        'style="padding:0px" align=\'center\'>' +
                        '<md-content style="background-color:{{barcolor}}">' +
                        '<md-item>' +
                        '<md-button ng-cloak' +
                        'ng-click="sidenavitemClick($index)">' +
                        '<md-icon md-svg-icon="{{item.icon}}"' +
                        'ng-style="plz.getIconFormat(item.icon, item.style)"' +
                        'aria-label="{{ item.name }}"' +
                        'class="step" ng-class="item.size">' +
                        '</md-icon>' +
                        '<span class="md-inline-list-icon-label">{{ item.name }}</span>' +
                        '</md-button>' +
                        '</md-item>' +
                        '</md-content>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
        '</div>'
    };
});
angular.module('footerBar').controller('didWeHaveAnIcon', didWeHaveAnIcon);
function didWeHaveAnIcon() {
        var vm = this;
        //        vm.currenticon = currenticon;
        //        vm.currentformat = currentformat;
        vm.getIconFormat = getIconFormat;
        function getIconFormat(icon, style) {
            var workingformat = {
                'font-size': '0px',
                width: '0px',
                height: '0px'
            };
            if (style) {
                /* jshint -W089 */
                for (var i in style) {
                    workingformat[i] = style[i];
                    //                    console.log (i, foo[i])
                }
            }
            return icon ? style : workingformat;
        }
    }
})();
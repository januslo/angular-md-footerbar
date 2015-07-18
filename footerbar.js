(function () {
angular.module('footerBar', []);
angular.module('footerBar').directive('footerBar', function() {
    return {
        restrict: 'E',
        scope: {
            vm: '=items',
            barcolor: '@barcolor',
            activebarcolor:'@activebarcolor',
            lineheight:'@lineheight',
            color:'@color',
            activecolor:'@activecolor'
        },
        compile: function(element, attrs) {
            console.log(JSON.stringify(attrs))
            if (!attrs.barcolor) { attrs.barcolor = 'blue'; }
            if(!attrs.lineheight){attrs.lineheight='32px';}
            if(!attrs.color){attrs.color = 'black';}
            if(!attrs.activebarcolor){attrs.activebarcolor = 'white'}
            if(!attrs.activecolor){attrs.activecolor = 'blue'}
        },
        template: '<div id="footerbar" ng-controller=\'didWeHaveAnIcon as plz\' >' +
            '<table class="table" id="footertable" ng-cloak>' +
                '<tbody>' +
                    '<tr>' +
                        '<td ng-repeat="item in vm track by $index"' +
                        'style="padding:0px" align=\'center\'>' +
                        '<md-content ng-style="plz.getBgFormat(item,barcolor,activebarcolor)">' +
                        '<md-button ' +
                        'ng-click="plz.footerbarNavitemClick($index,vm)" style="line-height:{{lineheight}}" layout-align="center center" >' +
                        '<ng-md-icon ng-if="plz.showIcon(item.icon)" icon="{{item.icon}}"' +
                        'ng-style="plz.getIconFormat(item, color,activecolor)"' +
                        'aria-label="{{ item.name }}"' +
                        'class="step" size="{{item.size}}">' +
                        '</ng-md-icon>' +
                        '<span class="md-inline-list-icon-label" ng-style="plz.getLabelStyle(item,color,activecolor)">{{ item.name }}</span>' +
                        '</md-button>' +
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
        vm.getIconFormat = getIconFormat;
        function getIconFormat(item,color,activeColor) {
            var workingformat = {
                color:color
            };
            if (item.iconStyle) {
                for (var i in item.iconStyle) {
                    workingformat[i] = item.iconStyle[i];
                }
            };
            if(item.isActive){
                workingformat.color = activeColor;
            }
            return workingformat;
        };
    vm.showIcon = function(icon){
        return icon&&icon.length&&icon.length>0;
    };
    vm.footerbarNavitemClick = function(idx,items){
        for(var i in items){
            items[i].isActive = false;
        }
        var item = items[idx];
        item.isActive  = true;
        if(item.href) {
            var currentlocation = document.location.href.split("#");
            document.location.href = currentlocation[0] + item.href;
        }
    };
    vm.getBgFormat = function(item,barcolor,activebarcolor){
        console.log(JSON.stringify(item))
        var style={backgroundColor:barcolor};
        if(item.isActive){
            style={backgroundColor:activebarcolor};
        }
        return style;
    };
    vm.getLabelStyle = function(item,color,activecolor){
        var style = {
            color:color
        };
        if(item.isActive){
            style.color = activecolor;
        }
        return style;
    }

    }
})();
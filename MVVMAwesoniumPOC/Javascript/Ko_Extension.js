/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * global ko
 */

( function()
{

    function PropertyListener(object, propertyname, listener) {
        return function (newvalue) {
            listener.TrackChanges(object, propertyname, newvalue);
        };
    }

    function MapToObservable(or, Listener, first) {
        var res = {};

        if ((first) && (Listener) && (Listener.RegisterFirst)) Listener.RegisterFirst(res);

        for (var att in or) {
            if (or.hasOwnProperty(att)) {
                var value = or[att];
                if ((value !== null) && (typeof value === 'object')) {
                    if (!Array.isArray(value)) {
                        res[att] = ko.observable(MapToObservable(value, Listener, false));
                        if ((Listener) && (Listener.RegisterMapping)) Listener.RegisterMapping(res, att, res[att]());
                    } else {
                        var nar = [];
                        for (var i in value) {
                            var eli = MapToObservable(value[i], Listener, false);
                            nar.push(eli);
                            if ((Listener) && (Listener.RegisterCollectionMapping)) Listener.RegisterCollectionMapping(res, att, i, eli);
                        }

                        res[att] = ko.observableArray(nar);
                        if ((Listener) && (Listener.RegisterMapping)) Listener.RegisterMapping(res, att, res[att]);
                    }
                } else {
                    res[att] = ko.observable(value).extend({
                        rateLimit: 200
                    });
                    if ((Listener) && (Listener.TrackChanges)) {
                        res[att].subscribe(PropertyListener(res, att, Listener));
                    }
                }
            }
        }

        return res;
    }


    //global ko
    ko.MapToObservable = function (o, list) {
        return MapToObservable(o, list,true);
    };

//global ko 
ko.bindingHandlers.ExecuteOnEnter = {
    init: function(element, valueAccessor, allBindings, viewModel) 
    {
        try
        {
            var value = valueAccessor();
        }
        catch(exception)
        {
            console.log(exception);
        }
        $(element).keypress(function (event){
            var keycode = (event.which ? event.which : event.keyCode);
            if (keycode===13)
            {
                value.call(viewModel);
                return false;
            }
        });
    }
};
}());
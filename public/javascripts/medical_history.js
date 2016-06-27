/**
 * Created by chimwemwe on 6/24/16.
 */

(function () {

    function __$__(id) {

        return document.getElementById(id);

    }

    function loadPage() {

        if(__$__("details")) {

            __$__("details").innerHTML = "";

            

        }

    }

    loadPage();

})();
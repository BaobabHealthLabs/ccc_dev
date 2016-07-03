/**
 * Created by chimwemwe on 7/2/16.
 */

function loadPage() {

    var parents = ['Normal', 'Pulses Present', 'General Condition', 'Amputation', 'Numbness symptoms'];
    var children = [['Yes', 'No'], ['Dorsalis Pedis', 'Posterior  Tibial'], ['Good', 'Minor skin lesions/fungal infections', 'Current foot ulceration', 'Oedema'], ['Toe(s) only', 'Below knee (BKA)', 'Above Knee (AKA)'], ['Yes', 'No']];
    var grandChildren = [[[],[]], [['Yes', 'No'], ['Yes', 'No']], [[],[],[],[]], [[], [], []], [[], []]];
    var categories = {0: 'LEFT FOOT/LEG', 1: 'RIGHT FOOT/LEG'};

    for (var i = 0; i < 2; i++) {

        for(var j = 0; j < parents.length; j++) {

            var input = document.createElement("input");
            input.type = "hidden";
            input.id = "Footcheck_root_0_parent_" + i + "_child_" + j;
            input.name = "data.obs.text." + categories[i] + " FOOT CHECK[]";
            input.value = parents[j];
            input.setAttribute("disabled", true);

            document.forms[0].appendChild(input);

            for(var k = 0; k < children[j].length; k++) {

                var input = document.createElement("input");
                input.type = "hidden";
                input.id = "Footcheck_root_0_parent_" + i + "_child_" + j + "_grandchild_" + k;
                input.name = "data.obs.text." + categories[i] + " FOOT CHECK[]";
                input.value = children[j][k];
                input.setAttribute("disabled", true);

                document.forms[0].appendChild(input);

                for(var l = 0; l < grandChildren[k].length; l++) {

                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.id = "Footcheck_root_0_parent_" + i + "_child_" + j + "_grandchild_" + k + "_greatgrandchild_" + l;
                    input.name = "data.obs.text." + categories[i] + " FOOT CHECK[]";
                    input.value = grandChildren[k][l];
                    input.setAttribute("disabled", true);

                    document.forms[0].appendChild(input);

                }
            }

        }

    }

    var textArea = document.createElement("textarea");
    textArea.cols = 1;
    textArea.rows = 1;
    textArea.setAttribute("disabled", true);
    textArea.id = "Footcheck";
    textArea.name = "Footcheck";
    textArea.setAttribute("condition", false);
    textArea.innerHTML = "Footcheck|Footcheck{Left foot/leg<parentgroup0><1>Normal<childcheckbox0>Yes<grandchildradio0></grandchildradio0>No<grandchildradio1></grandchildradio1></childcheckbox0>Pulses Present<childcheckbox1>Dorsalis Pedis<grandchildcheckbox0>Yes<greatgrandchildradio0></greatgrandchildradio0>No<greatgrandchildradio1></greatgrandchildradio1></grandchildcheckbox0>Posterior Tibial<grandchildcheckbox1>Yes<greatgrandchildradio0></greatgrandchildradio0>No<greatgrandchildradio1></greatgrandchildradio1></grandchildcheckbox1></childcheckbox1>General Condition<childcheckbox2>Good<grandchildcheckbox0></grandchildcheckbox0>Minor skin lesions/fungal infections<grandchildcheckbox1></grandchildcheckbox1>Current foot ulceration<grandchildcheckbox2></grandchildcheckbox2>Oedema<grandchildcheckbox3></grandchildcheckbox3></childcheckbox2>Amputation<childcheckbox3>Toe(s) only<grandchildradio0></grandchildradio0>Below knee (BKA)<grandchildradio1></grandchildradio1>Above Knee (AKA)<grandchildradio2></grandchildradio2></childcheckbox3>Numbness symptoms?<childcheckbox4>Yes<grandchildradio0></grandchildradio0>No<grandchildradio1></grandchildradio1></childcheckbox4></1></parentgroup0>Right foot/leg<parentgroup1><1>Normal<childcheckbox0>Yes<grandchildradio0></grandchildradio0>No<grandchildradio1></grandchildradio1></childcheckbox0>Pulses Present<childcheckbox1>Dorsalis Pedis<grandchildcheckbox0>Yes<greatgrandchildradio0></greatgrandchildradio0>No<greatgrandchildradio1></greatgrandchildradio1></grandchildcheckbox0>Posterior Tibial<grandchildcheckbox1>Yes<greatgrandchildradio0></greatgrandchildradio0>No<greatgrandchildradio1></greatgrandchildradio1></grandchildcheckbox1></childcheckbox1>General Condition<childcheckbox2>Good<grandchildcheckbox0></grandchildcheckbox0>Minor skin lesions/fungal infections<grandchildcheckbox1></grandchildcheckbox1>Current foot ulceration<grandchildcheckbox2></grandchildcheckbox2>Oedema<grandchildcheckbox3></grandchildcheckbox3></childcheckbox2>Amputation<childcheckbox3>Toe(s) only<grandchildradio0></grandchildradio0>Below knee (BKA)<grandchildradio1></grandchildradio1>Above Knee (AKA)<grandchildradio2></grandchildradio2></childcheckbox3>Numbness symptoms?<childcheckbox4>Yes<grandchildradio0></grandchildradio0>No<grandchildradio1></grandchildradio1></childcheckbox4></1></parentgroup1>}";

    document.forms[0].appendChild(textArea);

}

loadPage();

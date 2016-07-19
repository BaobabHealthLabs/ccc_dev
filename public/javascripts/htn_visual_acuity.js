/**
 * Created by chimwemwe on 7/2/16.
 */

function loadPage() {

    var results = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', 'Counting Fingers', 'Hand Movements',
        'No Perception of Light', 'Able to read small print', 'Able to read large print', 'Eye removed', 'Corrected'];

    var categories = {0: 'LEFT EYE', 1: 'RIGHT EYE'};

    for (var i = 0; i < 2; i++) {

        var input = document.createElement("input");
        input.type = "hidden";
        input.setAttribute("disabled", true);
        input.id = "Visual_Acuity_root_" + i + "_parent_0";
        input.name = "encounter";

        document.forms[0].appendChild(input);

        for(var j = 0; j < results.length; j++) {

            var input = document.createElement("input");
            input.type = "hidden";
            input.id = "Visual_Acuity_root_0_parent_" + i + "_child_" + j;
            input.name = "data.obs.text.Hypertension Test Type:Visual Acuity[]." + categories[i] + " VISUAL ACUITY[]";
            input.value = results[j];
            input.setAttribute("disabled", true);

            document.forms[0].appendChild(input);

        }

    }

    var textArea = document.createElement("textarea");
    textArea.cols = 1;
    textArea.rows = 1;
    textArea.setAttribute("disabled", true);
    textArea.id = "Visual_Acuity";
    textArea.name = "Visual_Acuity";
    textArea.setAttribute("condition", false);
    textArea.innerHTML = "Visual Acuity|Visual Acuity{Left Eye<parentgroup0><1>6/6<childcheckbox0></childcheckbox0>6/9<childcheckbox1></childcheckbox1>6/12<childcheckbox2></childcheckbox2>6/18<childcheckbox3></childcheckbox3>6/24<childcheckbox4></childcheckbox4>6/36<childcheckbox5></childcheckbox5>6/60<childcheckbox6></childcheckbox6>Corrected<childcheckbox13></childcheckbox13>Able to read small print<childcheckbox10></childcheckbox10>Able to read large print<childcheckbox11></childcheckbox11>Counting Fingers<childcheckbox7></childcheckbox7>Hand Movements<childcheckbox8></childcheckbox8>No Perception of Light<childcheckbox9></childcheckbox9>Eye removed<childcheckbox12></childcheckbox12></1></parentgroup0>Right Eye<parentgroup1><1>6/6<childcheckbox0></childcheckbox0>6/9<childcheckbox1></childcheckbox1>6/12<childcheckbox2></childcheckbox2>6/18<childcheckbox3></childcheckbox3>6/24<childcheckbox4></childcheckbox4>6/36<childcheckbox5></childcheckbox5>6/60<childcheckbox6></childcheckbox6>Corrected<childcheckbox13></childcheckbox13>Able to read small print<childcheckbox10></childcheckbox10>Able to read large print<childcheckbox11></childcheckbox11>Counting Fingers<childcheckbox7></childcheckbox7>Hand Movements<childcheckbox8></childcheckbox8>No Perception of Light<childcheckbox9></childcheckbox9>Eye removed<childcheckbox12></childcheckbox12></1></parentgroup1>}";

    document.forms[0].appendChild(textArea);

}

loadPage();

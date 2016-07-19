/**
 * Created by chimwemwe on 7/2/16.
 */

function loadPage() {

    var parents = ['Normal', 'Abnormal'];
    var children = [[], ['Cataracts', 'Diabetic Retinopathy', 'Hypertensive Retinopathy']];
    var grandChildren = [[], ['Background Retinopathy', 'Ploriferative Retinopathy', 'End Stage Eye Disease',
        'Maculopathy'], ['1', '2', '3', '4']];

    var categories = {0: 'LEFT EYE', 1: 'RIGHT EYE'};

    for (var i = 0; i < 2; i++) {

        for(var j = 0; j < parents.length; j++) {

            var input = document.createElement("input");
            input.type = "hidden";
            input.id = "Fundoscopy_root_0_parent_" + i + "_child_" + j;
            input.name = "data.obs.text.Hypertension Test Type:Fundoscopy[]." + categories[i] + " FUNDOSCOPY[]";
            input.value = parents[j];
            input.setAttribute("disabled", true);

            document.forms[0].appendChild(input);

            for(var k = 0; k < children[j].length; k++) {

                var input = document.createElement("input");
                input.type = "hidden";
                input.id = "Fundoscopy_root_0_parent_" + i + "_child_" + j + "_grandchild_" + k;
                input.name = "data.obs.text.Hypertension Test Type:Fundoscopy[]." + categories[i] + " FUNDOSCOPY[]";
                input.value = parents[j] + ": " + children[j][k];
                input.setAttribute("disabled", true);

                document.forms[0].appendChild(input);

                for(var l = 0; l < grandChildren[k].length; l++) {

                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.id = "Fundoscopy_root_0_parent_" + i + "_child_" + j + "_grandchild_" + k + "_greatgrandchild_" + l;
                    input.name = "data.obs.text.Hypertension Test Type:Fundoscopy[]." + categories[i] + " FUNDOSCOPY[]";
                    input.value = parents[j] + ": " + children[j][k] + ": " + grandChildren[k][l];
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
    textArea.id = "Fundoscopy";
    textArea.name = "Fundoscopy";
    textArea.setAttribute("condition", false);
    textArea.innerHTML = "Fundoscopy|Fundoscopy{Left Eye<parentgroup0><1>Normal<childradio0></childradio0>Abnormal<childradio1>Cataracts<grandchildcheckbox0></grandchildcheckbox0>Diabetic Retinopathy<grandchildcheckbox1>Background Retinopathy<greatgrandchildradio0></greatgrandchildradio0>Ploriferative Retinopathy<greatgrandchildradio1></greatgrandchildradio1>End Stage Eye Disease<greatgrandchildradio2></greatgrandchildradio2>Maculopathy<greatgrandchildradio3></greatgrandchildradio3></grandchildcheckbox1>Hypertensive Retinopathy<grandchildcheckbox2>1<greatgrandchildradio0></greatgrandchildradio0>2<greatgrandchildradio1></greatgrandchildradio1>3<greatgrandchildradio2></greatgrandchildradio2>4<greatgrandchildradio3></greatgrandchildradio3></grandchildcheckbox2></childradio1></1></parentgroup0>Right Eye<parentgroup1><1>Normal<childradio0></childradio0>Abnormal<childradio1>Cataracts<grandchildcheckbox0></grandchildcheckbox0>Diabetic Retinopathy<grandchildcheckbox1>Background Retinopathy<greatgrandchildradio0></greatgrandchildradio0>Ploriferative Retinopathy<greatgrandchildradio1></greatgrandchildradio1>End Stage Eye Disease<greatgrandchildradio2></greatgrandchildradio2>Maculopathy<greatgrandchildradio3></greatgrandchildradio3></grandchildcheckbox1>Hypertensive Retinopathy<grandchildcheckbox2>1<greatgrandchildradio0></greatgrandchildradio0>2<greatgrandchildradio1></greatgrandchildradio1>3<greatgrandchildradio2></greatgrandchildradio2>4<greatgrandchildradio3></greatgrandchildradio3></grandchildcheckbox2></childradio1></1></parentgroup1>}";

    document.forms[0].appendChild(textArea);

}

loadPage();

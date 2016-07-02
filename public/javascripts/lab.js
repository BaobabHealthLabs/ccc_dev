/**
 * Created by chimwemwe on 7/1/16.
 */

function resetPageAttributes(currentPage, attr){
    var attributes = {};

    switch(attr){
        case 'fbs':
            if (__$('fbs_unit').value == 'mmol/l')
                attributes = {'min':[2.7],'max':[27.8]};
            else
                attributes = {'min':[50],'max':[500]};
            break;

        case 'rbs':
            if (__$('rbs_unit').value == 'mmol/l')
                attributes = {'min':[2.7],'max':[27.8]};
            else
                attributes = {'min':[50],'max':[500]};
            break;

        case 'hba1c':
            attributes = {'min':[4], 'max':[30], 'absoluteMin':[0], 'absoluteMax':[50]};
            break;

        case 'cf':
            if (__$('cf_unit').value == 'mmol/l')
                attributes = {'min':[7],'max':[17]};
            else if(__$('cf_unit').value == 'mg/dl')
                attributes = {'min':[130],'max':[300]};
            break;

        case 'cnf':
            if (__$('cnf_unit').value == 'mmol/l')
                attributes = {'min':[7],'max':[17]};
            else if(__$('cnf_unit').value == 'mg/dl')
                attributes = {'min':[130],'max':[300]};
            break;
    }

    setAttributes(currentPage, attributes);
}

function setAttributes(currentPage, attributes){

    for (var value in attributes){
        currentPage.setAttribute(value, attributes[value]);
    }
}
// load_balancer.js

var counts = {};
var patients = {};

var UUIDs = {};

var section_size = 122;

var start_date;
var end_date;

function $(id) {
    return document.getElementById(id);
}

function setValues() {
    var arr = [0, 0, 0, 0, 0];

    for (var i = 1; i < 6; i++) {
        $("divDate" + i + "Status").innerHTML = arr[i - 1];
        changeRange(i, arr[i - 1]);
    }

    updateUI();

}

function changeRange(id, value) {
    var r = String(value).match(/^\d+$/);
    var group_size = parseInt($("limit").value) / 4;

    for (var i = 1; i < 6; i++) {
        $("divDate" + id + "Level" + i).style.width = 0 + "px";
    }

    if (r) {
        var range = 0;

        if (r >= 0 && r <= group_size) {
            range = "A";
        } else if (r > group_size && r <= (group_size * 2)) {
            range = "B";
        } else if (r > (group_size * 2) && r <= (group_size * 3)) {
            range = "C";
        } else if (r > (group_size * 3) && r <= (group_size * 4)) {
            range = "D";
        } else {
            range = "E";
        }

        for (var i = 1; i < 6; i++) {
            $("divDate" + id + "Level" + i).style.width = 0 + "px";
        }

        switch (range) {
            case "A":
                $("divDate" + id + "Level" + 1).style.width = (r * section_size / group_size) + "px";
                break;
            case "B":
                $("divDate" + id + "Level" + 1).style.width = section_size + "px";
                $("divDate" + id + "Level" + 2).style.width = ((r - group_size) * section_size / group_size) + "px";
                break;
            case "C":
                $("divDate" + id + "Level" + 1).style.width = section_size + "px";
                $("divDate" + id + "Level" + 2).style.width = section_size + "px";
                $("divDate" + id + "Level" + 3).style.width = ((r - (group_size * 2)) * section_size / group_size) + "px";
                break;
            case "D":
                $("divDate" + id + "Level" + 1).style.width = section_size + "px";
                $("divDate" + id + "Level" + 2).style.width = section_size + "px";
                $("divDate" + id + "Level" + 3).style.width = section_size + "px";
                $("divDate" + id + "Level" + 4).style.width = ((r - (group_size * 3)) * section_size / group_size) + "px";
                break;
            case "E":
                $("divDate" + id + "Level" + 1).style.width = section_size + "px";
                $("divDate" + id + "Level" + 2).style.width = section_size + "px";
                $("divDate" + id + "Level" + 3).style.width = section_size + "px";
                $("divDate" + id + "Level" + 4).style.width = section_size + "px";

                if (r <= (group_size * 5)) {
                    $("divDate" + id + "Level" + 5).style.width = ((r - (group_size * 4)) * section_size / group_size) + "px";
                } else {
                    $("divDate" + id + "Level" + 5).style.width = section_size + "px";
                }

                break;
        }
    }

}

function updateUI() {

    start_date = $("selYear").value.trim() + "-" + padZeros(parseInt($("selDate").value.trim()) + 1, 2) + "-" + "01";

    var next_month;

    switch (parseInt($("selDate").value.trim())) {

        case 0:
            next_month = 2;
            break;
        case 1:
            next_month = 3;
            break;
        case 2:
            next_month = 4;
            break;
        case 3:
            next_month = 5;
            break;
        case 4:
            next_month = 6;
            break;
        case 5:
            next_month = 7;
            break;
        case 6:
            next_month = 8;
            break;
        case 7:
            next_month = 9;
            break;
        case 8:
            next_month = 10;
            break;
        case 9:
            next_month = 11;
            break;
        case 10:
            next_month = 12;
            break;
        case 11:
            next_month = 1;
            break;
    }

    var last_date = new Date($("selYear").value.trim() + "-" + padZeros(next_month, 2) + "-" + "01");

    last_date.setDate(last_date.getDate() - 1);

    end_date = $("selYear").value.trim() + "-" + padZeros(parseInt($("selDate").value.trim()) + 1, 2) + "-" + padZeros(last_date.getDate(), 2);

    ajaxBookingRequest("/bookings?start_date=" + start_date + "&end_date=" + end_date);

}

function setMonth() {

    var month = parseInt($("selDate").value);
    var d = new Date($("selYear").value, month, 1);
    var yr = $("selYear").value;
    var day = $("selDay").value;
    var dy = "";

    switch (parseInt(day)) {
        case 0:
            dy = "Sun";
            break;
        case 1:
            dy = "Mon";
            break;
        case 2:
            dy = "Tue";
            break;
        case 3:
            dy = "Wed";
            break;
        case 4:
            dy = "Thur";
            break;
        case 5:
            dy = "Fri";
            break;
        case 6:
            dy = "Sat";
            break;
    }

    if (d.getDay() != day) {
        while (d.getDay() != day) {
            d.setDate(d.getDate() + 1);
        }
    }

    for (var i = 1; i < 6; i++) {
        $("divDate" + i).innerHTML = "";
        $("divDate" + i).setAttribute("hashvalue", "");
        changeRange(i, 0);
        $("divDate" + i + "Status").innerHTML = 0;
        $("remove_" + i).style.display = "none";
        $("add_" + i).style.display = "none";
    }

    var found = 0;

    // Check if the record exists at least twice. If it does, quit and report
    // the number of occurences
    for (var item in counts) {
        var dt = item.match(/(\d{4})-(\d+)-(\d+)/);
        var od = new Date(dt[1], dt[2], dt[3]);
        var td = new Date();

        if (od >= td) {
            if (counts[item][getCookie("patient_id")]) {
                found++;
                if (found >= 2) {
                    break;
                }
            }
        }
    }

    for (var i = 1; i < 6; i++) {
        $("divDate" + i).innerHTML = dy + ", " + d.getDate();

        $("divDate" + i).setAttribute("hashvalue", yr + "-" + padZeros(parseInt(month) + 1, 2) + "-" + padZeros(d.getDate(), 2));

        if (counts[yr + "-" + padZeros(month + 1, 2) + "-" + padZeros(d.getDate(), 2)]) {
            changeRange(i, counts[yr + "-" + padZeros(month + 1, 2) + "-" + padZeros(d.getDate(), 2)]["count"]);
            $("divDate" + i + "Status").innerHTML = counts[yr + "-" + padZeros(month + 1, 2) + "-" + padZeros(d.getDate(), 2)]["count"];
        } else {
            changeRange(i, 0);
            $("divDate" + i + "Status").innerHTML = 0;
        }

        var dateTime = new Date();

        if ($("divDate" + i).innerHTML.match(/\d+/) && d >= dateTime) {
            $("remove_" + i).style.display = "block";

            if (found < 2) {
                $("add_" + i).style.display = "block";
            } else {
                $("add_" + i).style.display = "block";

                $("add_" + i).onclick = function () {

                    var id = 'divDate' + this.id.match(/\d+/);

                    window.parent.dashboard.showConfirmMsg("This patient already has 2 or more active " +
                        "bookings. Are you sure you want to add another booking?", "Confirm", undefined, function() {

                        setData($(id).getAttribute('hashvalue'));

                    });

                }
            }
        }

        d.setDate(d.getDate() + 7);

        if (d.getMonth() != month) {
            break;
        }
    }
}

function setData(pos, subtract) {

    if (pos.length > 0) {
        makeBooking(pos, subtract);
    }

}

function makeBooking(pos, subtract) {

    var sel = getCookie("patient_id");
    var app_date = "";

    var date = pos.split("-");

    if (String(date[1]).match(/^\d$/)) {
        date[1] = "0" + date[1];
    }

    if (String(date[2]).match(/^\d$/)) {
        date[2] = "0" + date[2];
    }

    app_date = date[0] + "-" + date[1] + "-" + date[2];

    if (counts[pos]) {

        if (subtract) {
            if (counts[pos][sel]) {

                window.parent.dashboard.showConfirmMsg("Are you sure you want to void this booking?", "Confirm", undefined,
                    function () {

                        var uuid = UUIDs[pos];

                        if (uuid)
                            window.parent.dashboard.voidConcept(uuid);

                        counts[pos]["count"] = (parseInt(counts[pos]["count"]) - 1);

                        delete counts[pos][sel];

                        window.location = window.location.href;

                    })
            }
        } else {
            if (counts[pos][sel] == true) {
                window.parent.dashboard.showMsg("This patient already has a booking on this day!");
                return;
            } else {
                $("appointment_date").value = app_date;
                counts[pos][sel] = true;
                counts[pos]["count"] = (parseInt(counts[pos]["count"]) + 1);
                document.forms[0].submit();
            }
        }

    } else {
        if (!subtract) {
            $("appointment_date").value = app_date;
            counts[pos] = {};
            counts[pos][sel] = true;
            counts[pos]["count"] = 1;
            document.forms[0].submit();
        }


    }

    updateUI();

}

function showPatients(pos, subtract) {
    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.zIndex = 30;
    panel.id = "id_patients_panel";
    panel.style.width = "96.7%";
    panel.style.height = "85%";
    panel.style.backgroundColor = "#EEEEEE";
    panel.style.top = $("divParent").offsetTop + "px";
    panel.style.left = $("divParent").offsetLeft + "px";
    panel.style.border = "1.2px dotted #666666";
    panel.style.padding = "15px";

    $("content").appendChild(panel);

    var frame = document.createElement("fieldset");
    frame.style.height = "75%";
    frame.style.border = "1px #999999 solid";
    frame.style.backgroundColor = "#FFFFFF";

    var frame_content = document.createElement("div");
    frame_content.id = "id_frame_content";
    frame_content.style.width = "96%";
    frame_content.style.height = "86%";
    frame_content.style.padding = "15px";
    frame_content.style.backgroundColor = "#FFFFFF";
    frame_content.style.border = "1px #999999 dotted";
    frame_content.style.overflow = "auto";

    frame.appendChild(frame_content);

    var legend = document.createElement("legend");
    legend.style.fontStyle = "italic";
    legend.style.fontWeight = "normal";
    legend.style.fontSize = "1.5em";
    legend.style.color = "#333333";
    legend.style.padding = "5px";
    legend.style.backgroundColor = "#FFFFFF";
    legend.style.border = "1px solid #999999";
    legend.innerHTML = "Select Patient for " + (subtract ? "Cancellation of " : "") + "Booking";  //on " + day;

    frame.appendChild(legend);

    panel.appendChild(frame);

    var frame2 = document.createElement("fieldset");
    frame2.style.height = "62px";
    frame2.style.border = "1px #999999 solid";
    frame2.style.marginTop = "10px";
    frame2.style.backgroundColor = "#FFFFFF";
    frame2.style.padding = "10px";

    var legend2 = document.createElement("legend");
    legend2.style.fontStyle = "italic";
    legend2.style.fontWeight = "normal";
    legend2.style.fontSize = "1.5em";
    legend2.style.color = "#999999";

    frame2.appendChild(legend2);

    panel.appendChild(frame2);

    var cancel = document.createElement("button");
    cancel.innerHTML = "<span>Cancel</span>";
    cancel.style.cssFloat = "right";
    cancel.style.marginLeft = "5px";
    cancel.style.color = "#FFFFFF";
    cancel.className = "button red";
    cancel.onclick = function () {
        $("content").removeChild($("id_patients_panel"));
    }


    frame2.appendChild(cancel);

    var proceed = document.createElement("button");
    proceed.innerHTML = "<span>Proceed</span>";
    proceed.style.cssFloat = "right";
    proceed.style.color = "#FFFFFF";
    proceed.className = "button green";
    proceed.onclick = function () {
        var pats = document.getElementsByName("rdopatient");
        var sel = null;

        for (var j = 0; j < pats.length; j++) {
            if (pats[j].checked == true) {
                sel = pats[j].value;
                break;
            }
        }

        if (sel != null) {
            if (counts[pos]) {
                if (subtract) {
                    counts[pos]["count"] = (parseInt(counts[pos]["count"]) - 1);
                    delete counts[pos][sel];
                } else {
                    if (counts[pos][sel] == true) {
                        alert("This patient already has a booking on this day!");
                        return;
                    } else {
                        counts[pos][sel] = true;
                        counts[pos]["count"] = (parseInt(counts[pos]["count"]) + 1);
                    }
                }

            } else {
                counts[pos] = {};
                counts[pos][sel] = true;
                counts[pos]["count"] = 1;
            }

            updateUI();

            $("content").removeChild($("id_patients_panel"));
        } else {
            alert("Please select a patient to " + (subtract ? "cancel" : "book") + " an appointment for!");
        }
    }

    frame2.appendChild(proceed);

    var i = 0;

    for (var p in patients) {
        if (subtract) {
            if (counts[pos]) {
                if (!counts[pos][p]) {
                    continue;
                }
            } else {
                break;
            }
        } else {
            if (counts[pos]) {
                if (counts[pos][p] == true) {
                    continue;
                }
            }
        }

        i++;

        var row = document.createElement("div");
        row.id = "id_div_" + p;
        row.style.width = "96%";
        row.style.backgroundColor = ((i % 2 == 0) ? "#EEEEEE" : "");
        row.style.padding = "15px";
        row.style.fontSize = "1.2em";
        row.onclick = function () {
            $("rdo_" + this.id).click();
        }

        $("id_frame_content").appendChild(row);

        var lbl = document.createElement("label");
        lbl.style.width = "100%";
        lbl.style.cursor = "pointer";

        row.appendChild(lbl);

        var rdo = document.createElement("input");
        rdo.type = "radio";
        rdo.id = "rdo_id_div_" + p;
        rdo.name = "rdopatient";
        rdo.value = p;
        rdo.onclick = function () {
            alert(this.id);
        }

        lbl.appendChild(rdo);

        lbl.innerHTML += patients[p];

    }

}

function generateBalancer() {

    var divParent = document.createElement("div");
    divParent.style.width = "99.7%";
    divParent.style.backgroundColor = "white";
    divParent.style.height = "calc(100vh - 175px)";
    divParent.style.border = "1px dotted #666666";
    divParent.id = "divParent";
    divParent.style.overflow = "auto";

    $('inputFrame' + tstCurrentPage).appendChild(divParent);
    $('inputFrame' + tstCurrentPage).style.height = "85%";

    var divIn = document.createElement("div");
    divIn.style.cssFloat = "left";
    divIn.style.border = "#EEEEEE 1px dotted";
    divIn.style.width = "98%";
    divIn.style.height = "95.5%";
    divIn.style.margin = "1%";
    divIn.style.paddingBottom = "15px";

    divParent.appendChild(divIn);

    var divIn2 = document.createElement("div");
    divIn2.style.cssFloat = "left";
    divIn2.style.border = "#CCCCCC 1px solid";
    divIn2.style.height = "70px";
    divIn2.style.width = "98%";
    divIn2.style.marginTop = "1%";
    divIn2.style.marginLeft = "1%";
    divIn2.style.backgroundColor = "#EEEEEE";

    divIn.appendChild(divIn2);

    var divIn3 = document.createElement("div");
    divIn3.style.cssFloat = "left";
    divIn3.style.color = "#666666";
    divIn3.style.marginLeft = "15px";
    divIn3.style.marginTop = "0px";

    divIn2.appendChild(divIn3);

    var hr = document.createElement("h2");
    hr.innerHTML = "Patient Bookings";

    divIn3.appendChild(hr);

    var divIn4 = document.createElement("div");
    divIn4.style.cssFloat = "right";
    divIn4.style.color = "#666666";
    divIn4.style.marginLeft = "2px";
    divIn4.style.marginTop = "15px";
    divIn4.style.marginRight = "10px";

    divIn2.appendChild(divIn4);

    var selYear = document.createElement("select");
    selYear.id = "selYear";
    selYear.style.width = "120px";
    selYear.style.border = "1px solid #999";
    selYear.style.fontSize = "1.4em";
    selYear.style.padding = "5px";
    selYear.style.backgroundColor = "white";
    selYear.onchange = function () {

        updateUI();

    }

    divIn4.appendChild(selYear);

    var date = new Date();
    var min = date.getFullYear() - 10;
    var max = min + 20;

    for (var yr = min; yr < max; yr++) {

        var opt = document.createElement("option");
        opt.innerHTML = yr;
        if (yr == date.getFullYear()) {
            opt.selected = true;
        }


        selYear.appendChild(opt);

    }

    var divIn5 = document.createElement("div");
    divIn5.style.cssFloat = "right";
    divIn5.style.color = "#666666";
    divIn5.style.marginLeft = "2px";
    divIn5.style.marginTop = "15px";
    divIn5.style.marginRight = "5px";

    divIn2.appendChild(divIn5);

    var selMonth = document.createElement("select");
    selMonth.id = "selDate";
    selMonth.style.width = "175px";
    selMonth.style.border = "1px solid #999";
    selMonth.style.fontSize = "1.4em";
    selMonth.style.padding = "5px";
    selMonth.style.backgroundColor = "white";
    selMonth.onchange = function () {

        updateUI();

    }

    divIn5.appendChild(selMonth);

    var months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    for (var m in months) {
        var optMonth = document.createElement("option");
        optMonth.innerHTML = months[m];
        optMonth.value = m;
        if (m == date.getMonth()) {
            optMonth.selected = true;
        }

        selMonth.appendChild(optMonth);
    }

    var divIn6 = document.createElement("div");
    divIn6.style.cssFloat = "right";
    divIn6.style.color = "#666666";
    divIn6.style.marginLeft = "2px";
    divIn6.style.marginTop = "15px";
    divIn6.style.marginRight = "5px";

    divIn2.appendChild(divIn6);

    var selDay = document.createElement("select");
    selDay.id = "selDay";
    selDay.style.width = "178px";
    selDay.style.border = "1px solid #999";
    selDay.style.fontSize = "1.4em";
    selDay.style.padding = "5px";
    selDay.style.backgroundColor = "white";
    selDay.onchange = function () {

        updateUI();

    }

    divIn6.appendChild(selDay);

    var days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    for (var d in days) {
        var optDay = document.createElement("option");
        optDay.innerHTML = days[d];
        optDay.value = d;
        if (d == 2) {
            optDay.selected = true;
        }

        selDay.appendChild(optDay);

    }

    var divIn7 = document.createElement("div");
    divIn7.style.cssFloat = "right";
    divIn7.style.color = "#666666";
    divIn7.style.marginLeft = "2px";
    divIn7.style.marginTop = "15px";
    divIn7.style.marginRight = "5px";

    divIn2.appendChild(divIn7);

    var lbl = document.createElement("label");

    divIn7.appendChild(lbl);

    var input = document.createElement("input");
    input.type = "text";
    input.setAttribute("readonly", "true");
    input.id = "limit";
    input.value = "100";
    input.style.textAlign = "center";
    input.style.width = "60px";
    input.style.border = "1px solid #999";
    input.style.fontSize = "1.4em";
    input.style.padding = "6px";
    input.style.backgroundColor = "white";
    input.onchange = function () {

        updateUI();

    }

    lbl.innerHTML = "Max/day ";

    lbl.appendChild(input);

    var divIn8 = document.createElement("div");
    divIn8.style.cssFloat = "left";
    divIn8.style.border = "#EEEEEE 1px solid";
    divIn8.style.height = "62px";
    divIn8.style.width = "98%";
    divIn8.style.marginTop = "1%";
    divIn8.style.marginLeft = "1%";

    divIn.appendChild(divIn8);

    var divIn9 = document.createElement("div");
    divIn9.style.cssFloat = "left";
    divIn9.style.border = "#EEEEEE 1px solid";
    divIn9.style.height = "62px";
    divIn9.style.width = "98%";
    divIn9.style.marginTop = "1%";
    divIn9.style.marginLeft = "1%";

    divIn.appendChild(divIn9);

    var divIn10 = document.createElement("div");
    divIn10.style.cssFloat = "left";
    divIn10.style.border = "#EEEEEE 1px solid";
    divIn10.style.height = "62px";
    divIn10.style.width = "98%";
    divIn10.style.marginTop = "1%";
    divIn10.style.marginLeft = "1%";

    divIn.appendChild(divIn10);

    var divIn11 = document.createElement("div");
    divIn11.style.cssFloat = "left";
    divIn11.style.border = "#EEEEEE 1px solid";
    divIn11.style.height = "62px";
    divIn11.style.width = "98%";
    divIn11.style.marginTop = "1%";
    divIn11.style.marginLeft = "1%";

    divIn.appendChild(divIn11);

    var divIn12 = document.createElement("div");
    divIn12.style.cssFloat = "left";
    divIn12.style.border = "#EEEEEE 1px solid";
    divIn12.style.height = "62px";
    divIn12.style.width = "98%";
    divIn12.style.marginTop = "1%";
    divIn12.style.marginLeft = "1%";

    divIn.appendChild(divIn12);

    // Day panels
    var divIn13 = document.createElement("div");
    divIn13.style.cssFloat = "left";
    divIn13.setAttribute("hashvalue", "");
    divIn13.id = "divDate1";
    divIn13.style.height = "48px";
    divIn13.style.width = "130px";
    divIn13.style.backgroundColor = "#EEEEEE";
    divIn13.style.paddingLeft = "10px";
    divIn13.style.paddingTop = "14px";
    divIn13.style.textAlign = "left";
    divIn13.innerHTML = "Tuesday 4";
    divIn13.style.fontSize = "24px";

    divIn8.appendChild(divIn13);

    var divIn14 = document.createElement("div");
    divIn14.style.cssFloat = "left";
    divIn14.setAttribute("hashvalue", "");
    divIn14.id = "divDate2";
    divIn14.style.height = "48px";
    divIn14.style.width = "130px";
    divIn14.style.backgroundColor = "#EEEEEE";
    divIn14.style.paddingLeft = "10px";
    divIn14.style.paddingTop = "14px";
    divIn14.style.textAlign = "left";
    divIn14.innerHTML = "Tuesday 4";
    divIn14.style.fontSize = "24px";

    divIn9.appendChild(divIn14);

    var divIn15 = document.createElement("div");
    divIn15.style.cssFloat = "left";
    divIn15.setAttribute("hashvalue", "");
    divIn15.id = "divDate3";
    divIn15.style.height = "48px";
    divIn15.style.width = "130px";
    divIn15.style.backgroundColor = "#EEEEEE";
    divIn15.style.paddingLeft = "10px";
    divIn15.style.paddingTop = "14px";
    divIn15.style.textAlign = "left";
    divIn15.innerHTML = "Tuesday 4";
    divIn15.style.fontSize = "24px";

    divIn10.appendChild(divIn15);

    var divIn16 = document.createElement("div");
    divIn16.style.cssFloat = "left";
    divIn16.setAttribute("hashvalue", "");
    divIn16.id = "divDate4";
    divIn16.style.height = "48px";
    divIn16.style.width = "130px";
    divIn16.style.backgroundColor = "#EEEEEE";
    divIn16.style.paddingLeft = "10px";
    divIn16.style.paddingTop = "14px";
    divIn16.style.textAlign = "left";
    divIn16.innerHTML = "Tuesday 4";
    divIn16.style.fontSize = "24px";

    divIn11.appendChild(divIn16);

    var divIn17 = document.createElement("div");
    divIn17.style.cssFloat = "left";
    divIn17.setAttribute("hashvalue", "");
    divIn17.id = "divDate5";
    divIn17.style.height = "48px";
    divIn17.style.width = "130px";
    divIn17.style.backgroundColor = "#EEEEEE";
    divIn17.style.paddingLeft = "10px";
    divIn17.style.paddingTop = "14px";
    divIn17.style.textAlign = "left";
    divIn17.innerHTML = "Tuesday 4";
    divIn17.style.fontSize = "24px";

    divIn12.appendChild(divIn17);

    //Bars and Buttons
    for (var i = 0; i < 5; i++) {

        var div = eval("divIn" + (parseInt(8 + i)));
        var colWidth = section_size + "px";

        var divIn26 = document.createElement("button");
        divIn26.id = "remove_" + parseInt(1 + i);
        divIn26.style.cssFloat = "left";
        divIn26.className = "button green";
        divIn26.onclick = function () {
            setData($('divDate' + this.id.match(/\d+/)).getAttribute('hashvalue'), true);
        }
        divIn26.innerHTML = "<span>-</span>"
        divIn26.style.display = "none";
        divIn26.style.minWidth = "60px";

        div.appendChild(divIn26);

        var divIn27 = document.createElement("button");
        divIn27.style.cssFloat = "left";
        divIn27.id = "add_" + parseInt(1 + i);
        divIn27.onclick = function () {
            setData($('divDate' + this.id.match(/\d+/)).getAttribute('hashvalue'));
        }
        divIn27.className = "button green";
        divIn27.innerHTML = "<span>+</span>"
        divIn27.style.display = "none";
        divIn27.style.minWidth = "60px";

        div.appendChild(divIn27);

        var divIn28 = document.createElement("div");
        divIn28.style.cssFloat = "left";
        divIn28.id = "divDate" + parseInt(1 + i) + "Level1";
        divIn28.style.height = "100%";
        divIn28.style.width = colWidth;
        divIn28.style.backgroundColor = "greenyellow";
        divIn28.style.marginLeft = "1px";

        div.appendChild(divIn28);

        var divIn29 = document.createElement("div");
        divIn29.style.cssFloat = "left";
        divIn29.id = "divDate" + parseInt(1 + i) + "Level2";
        divIn29.style.height = "100%";
        divIn29.style.width = colWidth;
        divIn29.style.backgroundColor = "limegreen";
        divIn29.style.marginLeft = "0px";

        div.appendChild(divIn29);

        var divIn30 = document.createElement("div");
        divIn30.style.cssFloat = "left";
        divIn30.id = "divDate" + parseInt(1 + i) + "Level3";
        divIn30.style.height = "100%";
        divIn30.style.width = colWidth;
        divIn30.style.backgroundColor = "gold";
        divIn30.style.marginLeft = "0px";

        div.appendChild(divIn30);

        var divIn31 = document.createElement("div");
        divIn31.style.cssFloat = "left";
        divIn31.id = "divDate" + parseInt(1 + i) + "Level4";
        divIn31.style.height = "100%";
        divIn31.style.width = colWidth;
        divIn31.style.backgroundColor = "orange";
        divIn31.style.marginLeft = "0px";

        div.appendChild(divIn31);

        var divIn32 = document.createElement("div");
        divIn32.style.cssFloat = "left";
        divIn32.id = "divDate" + parseInt(1 + i) + "Level5";
        divIn32.style.height = "100%";
        divIn32.style.width = colWidth;
        divIn32.style.backgroundColor = "red";
        divIn32.style.marginLeft = "0px";

        div.appendChild(divIn32);

        var divIn33 = document.createElement("div");
        divIn33.style.cssFloat = "right";
        divIn33.id = "divDate" + parseInt(1 + i) + "Status";
        divIn33.style.height = "48px";
        divIn33.style.width = "80px";
        divIn33.style.backgroundColor = "#EEEEEE";
        divIn33.style.paddingTop = "15px";
        divIn33.style.fontSize = "24px";
        divIn33.style.marginLeft = "0px";
        divIn33.style.textAlign = "center";

        div.appendChild(divIn33);
    }

    setValues();
}

function ajaxBookingRequest(aUrl) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        handleBookingResult(httpRequest);
    };
    try {
        httpRequest.open('GET', aUrl, true);
        httpRequest.send(null);
    } catch (e) {
    }
}

function handleBookingResult(aXMLHttpRequest) {
    if (!aXMLHttpRequest) return;

    if (aXMLHttpRequest.readyState == 4 && aXMLHttpRequest.status == 200) {

        var result = JSON.parse(aXMLHttpRequest.responseText);

        counts = {};

        UUIDs = {};

        var dates = Object.keys(result.data);

        for (var i = 0; i < dates.length; i++) {

            var date = dates[i];

            counts[date] = {};
            counts[date]["count"] = 0;

            for (var j = 0; j < result.data[date].length; j++) {

                var sel = result.data[date][j][0];

                UUIDs[date] = result.data[date][j][1];

                if (!counts[date][sel]) {

                    counts[date]["count"]++;

                }

                counts[date][sel] = true;

            }

        }

        setMonth();

    }
}

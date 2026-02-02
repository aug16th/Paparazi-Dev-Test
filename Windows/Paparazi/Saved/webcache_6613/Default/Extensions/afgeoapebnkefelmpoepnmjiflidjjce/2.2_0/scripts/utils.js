///Removed version report 27/04/2020

var searchType = DEFAULT_SEARCH.type;
var searchEngine = DEFAULT_SEARCH.engine;
var searchObject = {};
searchObject['Type'] = searchType;
searchObject['Engine'] = searchEngine;
var details = chrome.app.getDetails();
var param1, param2, param3, param4;
var campaignID = '326';

function getParameterByName(name, str) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(str);
    if (results == null)
        return "";
    else
        return results[1].replace(/\+/g, " ");
}

function getSearchURL(searchQuery, Funnel) {
    searchObject.URL = SEARCH_ENGINES[localStorage['Engine']][searchObject.Type];
    searchObject.URL = searchObject.URL.replace('{{%q}}', encodeURIComponent(searchQuery));
    addTrackingData(searchObject, Funnel);
    localStorage['Engine'] = DEFAULT_SEARCH.engine;
    return searchObject.URL;
}

function addTrackingData(searchObject, Funnel) {
    switch (localStorage['Engine']) {
        case "yahoo":
            addType(searchObject);
            param1 = 'CH';
            param2 = Funnel;
            param3 = 'campaignID=' + campaignID + '&UserID=' + localStorage.getItem('userID');
            param4 = 'default';
            searchObject.TrackingData = localStorage.getItem("param4");
            if (searchObject.TrackingData != null) {
                param4 = searchObject.TrackingData;
            }
            searchObject.URL = searchObject.URL + '&param1=' + param1 + '&param2=' + param2 + '&param3=' + encodeURIComponent(param3) + '&param4=' + encodeURIComponent(param4);
        default:
    }
}

function addType(searchObject) {
    var type = localStorage.getItem("type");
    if (type != null) {
        searchObject.URL = searchObject.URL + '&' + "type=" + type;
    } else {
        searchObject.URL = searchObject.URL + '&' + "type=c110dd8eb21964c0b7cda94c8e1";
    }
}

function sendHttpRequest(type, Data) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    var request = REPORT_URL + '?' + Data;
    xhr.open(type, request, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send(null);
}

function report(evt) {
    var params = [];
    var now = new Date();
    var ticks = now.getTime();
    params.push('atom_stream=selected_search');
    params.push('timestamp=' + ticks);
    params.push('name=' + chrome.app.getDetails().name);    
    params.push('id=' + chrome.app.getDetails().id);
    params.push('e=' + evt);
    params.push('campaignID=' + campaignID);
    if (localStorage.getItem("userID") != null) {
        params.push('userID=' + localStorage.getItem("userID"));
    }
    if (localStorage.getItem("reportParams") != null) {
        params.push('extra_data=' + localStorage.getItem("reportParams"));
    }
    var data = params.join('&');
    sendHttpRequest("GET", data)
}
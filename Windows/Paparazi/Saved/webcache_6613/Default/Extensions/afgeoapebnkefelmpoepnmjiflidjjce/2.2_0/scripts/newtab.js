function startClock() {
    var time = $('.time');
    var meridiem = $('.meridiem');

    function zeroPad(value) {
        return (value < 10 ? "0" + value : "" + value);
    }

    function updateClock() {
        var now = new Date();
        var ampm = now.getHours() >= 12 ? 'pm' : 'am';
        var hour = zeroPad((now.getHours() % 12) || 12);
        var minutes = zeroPad(now.getMinutes());
        time.text(hour + ":" + minutes);
        meridiem.text(ampm);
    }
    setInterval(updateClock, 1000);
    updateClock();
}

function SetBackgroundImage() {
    var body = $('body');
    imageId = Math.floor(Math.random() * DEFAULT_BACKGROUND.TotalImages) + 1;
    body.css('background-image', "url(\"" + "../images/wp/" + imageId + ".jpg" + "\")");

}

function SearchTypeInitialize() {
    var buttons = $('.search-types a');
    $(".search-types a[data-type=\"" + DEFAULT_SEARCH.type + "\"]").addClass('active');
    buttons.click(function(event) {
        event.preventDefault();
        var clickedButton = $(this);
        buttons.not(clickedButton).removeClass('active');
        clickedButton.addClass('active');
        searchObject.Type = clickedButton.data('type');
    });

}

function SearchEngineInitialize() {
    $('.search-engine select')
        .change(function() {
            searchObject.Engine = $(this).val();
            localStorage['Engine'] = $(this).val();
        })
}

function performSearch(event) {
    event.preventDefault();
    var query = $('.search-query input').val();
    if (query.length > 0) {
        window.location.href = getSearchURL(query, 'NT');

    }
}

$(function initialize() {
    report('NewTab');
    startClock();
    SetBackgroundImage();
    SearchTypeInitialize();
    SearchEngineInitialize();

    $('form').submit(performSearch);
    $('.searchButton').click(performSearch);
});
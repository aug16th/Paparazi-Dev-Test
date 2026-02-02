localStorage['Counter'] = 0;
localStorage['Engine'] = 'yahoo';

function openPP() {
    chrome.tabs.create({
        url: "http://www.selected-search.com/privacy-policy.pdf"
    })
}

function openAbout() {
    chrome.tabs.create({
        url: "http://www.selected-search.com/selected-search-about.pdf"
    })
}

for (i = 0; i < 2; i++) {
    context_menus = [
        ['Privacy Policy', 'About'],
        ['browser_action'],
        ['PP', 'About'],
        [openPP, openAbout]
    ]
    chrome.contextMenus.create({
        'title': context_menus[0][i],
        'contexts': ['browser_action'],
        'id': context_menus[2][i],
        'onclick': context_menus[3][i]
    })
}



if (localStorage.getItem('userID') == null) {
    localStorage.setItem('userID', Math.floor(Math.random() * (9000000000 - 1001)) + 1000);
}


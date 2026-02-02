var DEFAULT_BACKGROUND = {
    TotalImages: '1'
};
var DEFAULT_SEARCH = {
    engine: 'yahoo',
    type: 'web',
	country: 'us'
};

var REPORT_URL = 'http://ext.selected-search.com';


var SEARCH_ENGINES = {
    'google': {
        'web': 'https://www.google.com/search?q={{%q}}',
        'image': 'https://www.google.com/search?q={{%q}}&tbm=isch',
        'video': 'https://www.google.com/search?q={{%q}}&tbm=vid'
    },
    'bing': {
        'web': 'https://www.bing.com/search?q={{%q}}',
        'image': 'https://www.bing.com/images/search?q={{%q}}',
        'video': 'https://www.bing.com/videos/search?q={{%q}}'
    },
    'yahoo': {
        'web': 'http://selected-search.com/?q={{%q}}',
        'image': 'http://selected-search.com/?q={{%q}}&category=images',
        'video': 'http://selected-search.com/?q={{%q}}&category=video'
    },
};

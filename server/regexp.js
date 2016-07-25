var regexp = function () {
    var exp = '(?!bae|[0-9])[A-GJ-NP-TV-gj-np-tv-z][a][y]?';
    return new RegExp(exp, 'g');
};

module.exports  = {regexp};

var sortJson = function sortResults(json, prop, asc) {
    json = json.sort(function(a, b) {
        if (asc) {
            return (String(a[prop]).toLowerCase() > String(b[prop]).toLowerCase()) ? 1 : ((String(a[prop]).toLowerCase() < String(b[prop]).toLowerCase()) ? -1 : 0);
        } else {
            return (String(b[prop]).toLowerCase() > String(a[prop]).toLowerCase()) ? 1 : ((String(b[prop]).toLowerCase() < String(a[prop]).toLowerCase()) ? -1 : 0);
        }
    });
    return json;
}

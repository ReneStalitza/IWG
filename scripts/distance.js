function getDistance(lat1, lon1, lat2, lon2) {
    var a1 = toRadians(parseFloat(lat1));
    var a2 = toRadians(parseFloat(lon1));
    var b1 = toRadians(lat2);
    var b2 = toRadians(lon2);
    var deltaLat = a1 - b1;
    var deltaLon = a2 - b2;
    var result = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(a1) * Math.cos(b1) * Math.pow(Math.sin(deltaLon / 2), 2);
    result = 2 * Math.asin(Math.min(1.0, Math.sqrt(result)));
    return result * 6371;
}

function toRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

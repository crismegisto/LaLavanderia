/**
 * @return {boolean} true if (lng, lat) is in bounds
 */
export const contains = (bounds, lat, lng) => {
  let count = 0;
  for (let b = 0; b < bounds.length; b++) {
    let vertex1 = bounds[b];
    let vertex2 = bounds[(b + 1) % bounds.length];
    if (west(vertex1, vertex2, lng, lat)) {
      ++count;
    }
  }
  count %= 2;

  return count ? true : false;
};

/**
 * @return {boolean} true if (lng,lat) is west of the line segment connecting A and B
 */
const west = (A, B, lng, lat) => {
  if (A.lat <= B.lat) {
    if (lat <= A.lat || lat > B.lat || (lng >= A.lng && lng >= B.lng)) {
      return false;
    } else if (lng < A.lng && lng < B.lng) {
      return true;
    } else {
      return (lat - A.lat) / (lng - A.lng) > (B.lat - A.lat) / (B.lng - A.lng);
    }
  } else {
    return west(B, A, lng, lat);
  }
};

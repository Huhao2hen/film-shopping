let cache = {

}
export function indexToSeat(index) {
  index = parseInt(index) + 1
  let row = parseInt(Math.ceil(index / 12))
  let column = index % 12 ? index % 12 : 12
  let seatInfo = `${row}排${column}座`
  cache[index - 1] = seatInfo
  console.log(cache);
  return seatInfo
}

export function seatToIndex(seatInfo) {
  for (let index in cache) {
    if (cache.hasOwnProperty(index)) {
      if (cache[index] === seatInfo) {
        let result = index
        delete cache[index]
        console.log(cache);
        return result
      }
    }
  }
}

export function deleteSeatCache(index) {
  delete cache[index]
  console.log(cache);
}

export function getSeatCache() {
  return Object.values(cache)
}

export function clearSeatCache() {
  cache = {}
}
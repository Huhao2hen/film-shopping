import { request } from "./index";

export function scheduleCinemaList(movieId) {
  return request({
    url: '/api/schedule/cinema',
    method: 'get',
    params: {
      movieId
    }
  })
}
export function setScheduleSeat(schedule) {
  return request({
    url: '/api/schedule/updateSeatInfo',
    method: 'post',
    data: schedule
  })
}


export function scheduleMovieList(cinemaId) {
  return request({
    url: '/api/schedule/movie',
    method: 'get',
    params: {
      cinemaId
    }
  })
}


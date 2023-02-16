import { request } from "./index";


export function getCinemaList(cinemaName) {
  return request({
    url: 'api/cinema/list',
    method: 'get',
    params: {
      cinemaName
    },
  })
}

export function getCinemasByIds(cinemaIds) {
  return request({
    url: `api/cinemas`,
    method: 'post',
    data:
      cinemaIds

  })
}

export function getCinemaNameById(cinemaId) {
  return request({
    url: `api/cinema/${cinemaId}`,
    method: 'get',
  })
}


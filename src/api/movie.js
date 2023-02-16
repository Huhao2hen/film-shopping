import { request } from "./index";

export function getMovieList(pageNum, pageSize, movieName) {
  return request({
    url: 'api/movie/page',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      movieName
    },
  })
}
export function getMovieTagList(movieType) {
  return request({
    url: 'api/movie/list',
    method: 'get',
    params: {
      movieType
    },
  })
}
export function getMovieSearchList(movieName) {
  return request({
    url: 'api/movie/searchlist',
    method: 'get',
    params: {
      movieName
    },
  })
}
export function getMovie(id) {
  return request({
    url: `api/movie/${id}`,
    method: 'get',
  })
}

export function getMoviesByIds(movieIds) {
  return request({
    url: `api/movies`,
    method: 'post',
    data:
      movieIds
  })
}
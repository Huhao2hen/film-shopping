import { scheduleCinemaList, scheduleMovieList } from '@/api/schedule'
import { ElMessage } from 'element-plus'
import { getCinemasByIds } from '../api/cinema'
import { getMoviesByIds } from '../api/movie'

const schedule = {
  state: {
    needShow: '',
    scheduleInfo: '',
    scheduleList: [],
    cinemas: [],
    movies: []
  },
  mutations: {
    setNeedShow(state, needShow) {
      state.needShow = needShow
    },
    setScheduleInfo(state, playload) {
      state.scheduleInfo = playload
    },
    setScheduleList(state, playload) {
      state.scheduleList = playload
    },
    setCinemas(state, playload) {
      state.cinemas = playload
    },
    setMovies(state, playload) {
      state.movies = playload
    },
    clearSchedule(state) {
      state.cinemas = []
      state.movies = []
      state.scheduleList = []
    }
  },
  actions: {
    async setCinemaList({ commit, state }, movieId) {
      let { data } = await scheduleCinemaList(movieId)
      if (data.length === 0) {
        ElMessage.info('该电影还未排档期');
        return false
      } else {
        let cinemaIds = Array.from(new Set(Array.prototype.map.call(data, (item => item.cinemaId))))
        let cinemas = await getCinemasByIds(cinemaIds)
        console.log(cinemaIds);
        commit('setCinemas', cinemas.data)
        commit('setScheduleList', data)
      }
    },

    async setMovieList({ commit, state }, cinemaId) {
      let { data } = await scheduleMovieList(cinemaId)
      if (data.length === 0) {
        ElMessage.info('该电影院还未排档期');
        return false
      } else {
        let movieIds = Array.from(new Set(Array.prototype.map.call(data, (item => item.movieId))))
        let movies = await getMoviesByIds(movieIds)
        console.log(movieIds);
        commit('setMovies', movies.data)
        commit('setScheduleList', data)
      }
    }
  }
}
export default schedule
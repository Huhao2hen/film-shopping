import { getMovie } from '@/api/movie'

const movie = {
  state: {
    movieInfo: {},
    movieTagList: []
  },
  mutations: {
    setMovieInfo(state, playload) {
      state.movieInfo = playload
    },
    setMovieTagList(state, playload) {
      state.movieTagList = playload
    },
    clearMovieInfo(state) {
      state.movieInfo = {}
    }
  },
  actions: {
    async setInfo({ state, commit }, id) {
      let { data } = await getMovie(id)
      commit('setMovieInfo', data)
    },

  }
}
export default movie
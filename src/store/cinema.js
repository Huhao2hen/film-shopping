import { getCinemaNameById } from '@/api/cinema'

const cinema = {
  state: {
    cinemaInfo: {}
  },
  mutations: {
    setCinemaInfo(state, playload) {
      state.cinemaInfo = playload
    }
  },
  actions: {
    async setCinemaInfo({ commit, state }, cinemaId) {
      
    }
  }
}
export default cinema
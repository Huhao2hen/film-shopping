

const order = {
  state: {
    orderInfo: {}
  },
  mutations: {
    setOrderInfo(state, playload) {
      state.orderInfo = playload
    }
  },
  actions: {
    async setOrderInfo({ commit, state }, cinemaId) {
      
    }
  }
}
export default order
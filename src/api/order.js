import { request } from "./index";

export function payOrder(orderInfo,) {
  return request({
    url: 'api/order/save',
    method: 'post',
    data: orderInfo
  })
}

export function cancelOrder(orderId,) {
  return request({
    url: 'order/cancel',
    method: 'post',
    params: {
      orderId
    }
  })
}
export function getOrderList(pageNum, pageSize=20, movieName) {
  return request({
    url: 'api/order/page',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      movieName
    },
  })
}
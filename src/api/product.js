import request from '@/utils/requst'

//获取商品详情
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

// 获取商品推荐
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}

// 获取热销榜
export const findGoodsHot = ({id,type, limit = 3}) => {
  return request('/goods/hot', 'get', {id, type, limit })
}

// 获取评价总体信息
export const findCommentInfo = (id) => {
  return request(`goods/${id}/evaluate`,'get')
}

// 获取评价详细信息
export const findCommentList = (id,reqParams) => {
  return request(`goods/${id}/evaluate/page`, 'get', {reqParams})
}
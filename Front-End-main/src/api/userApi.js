import request from '@/utils/request'

/***
 * 用户登入
 * @param userInfo
 * @returns {Promise<any>}
 */
export const userLoginApi = async userInfo => {
  const { data: res } = await request.post('/user/login', userInfo)
  return res
}

/***
 * 获取用户数据列表
 * @param queryInfo
 * @returns {Promise<any>}
 */
export const getUserListApi = async queryInfo => {
  const { data: res } = await request.get('/user/find', {
    params: queryInfo
  })
  return res
}

/***
 * 删除用户
 * @param id
 * @returns {Promise<any>}
 */
export const deleteUserApi = async id => {
  const { data: res } = await request.delete(`/user/del/${id}`)
  return res
}

/**
 * 更新用户信息
 * @param {*} userInfo
 * @returns {Promise<any>}
 */
export const updateUserApi = async userInfo => {
  const { data: res } = await request.post(`/user/update/${userInfo?._id}`, userInfo)
  return res
}

/***
 * 更新用户状态
 * @param id
 * @param state
 * @returns {Promise<any>}
 */
export const updateUserStateApi = async (id, state) => {
  const { data: res } = await request.put(`user/${id}/state/${state}`)
  return res
}

/***
 * 添加用户
 * @param userInfo
 * @returns {Promise<any>}
 */
export const addUserApi = async userInfo => {
  const { data: res } = await request.post('/user/add', userInfo)
  return res
}

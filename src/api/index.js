// api.js
import { httpGet, httpPost } from './http.js';

// 加载可视化船体数据
export const login = (params = {}) => httpGet({ url: 'manage/login', params })
// 全部接口
export const allbooks = (params = {}) => httpGet({ url: 'book', params })

export const deleteBooks = (params = {}) => httpGet({ url: 'deleteBooks', params })

export const editBooks = (params = {}) => httpGet({ url: 'editBooks', params })

// 男生接口
export const boybooks = (params = {}) => httpGet({ url: 'boyBooks', params })

export const deleteBoyBooks = (params = {}) => httpGet({ url: 'deleteBoyBooks', params })

export const editBoyBooks = (params = {}) => httpGet({ url: 'editBoyBooks', params })
// 女生接口
export const girlbooks = (params = {}) => httpGet({ url: 'girlbooks', params })
// 出版接口
export const publishBooks = (params = {}) => httpGet({ url: 'publishBooks', params })

// 管理员
export const manage = (params = {}) => httpGet({ url: 'manage', params })
export const editmanage = (params = {}) => httpGet({ url: 'editmanage', params })
export const deletemanage = (params = {}) => httpGet({ url: 'deletemanage', params })
export const insertmanage = (params = {}) => httpGet({ url: 'insertmanage', params })

// 普通用户
export const user = (params = {}) => httpGet({ url: 'user', params })
export const edituser = (params = {}) => httpGet({ url: 'edituser', params })
export const deleteuser = (params = {}) => httpGet({ url: 'deleteuser', params })
export const insertuser = (params = {}) => httpGet({ url: 'insertuser', params })
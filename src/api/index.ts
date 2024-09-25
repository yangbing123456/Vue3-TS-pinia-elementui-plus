import service from '@/untils/request'

/**
 *
 * @description:mock用户管理接口
 */

export const getUserData = () => {
  return service({
    url: 'http://127.0.0.1:4523/m1/5213291-0-default/system/user',
    method: 'post'
  })
}

/**
 *
 * @description: mock 用户管理新增接口
 */

// export const addUser = (data: addUserType) => {
//   return service({
//     url: 'http://127.0.0.1:4523/m1/5213291-0-default/system/add',
//     method: 'post',
//     data
//   })
// }

/**
 *
 * @description:mock 角色管理接口
 */

export const getRoleData = () => {
  return service({
    url: '/mock/role.json',
    method: 'get'
  })
}

/**
 *
 * @description: mock基本表格数据
 */
export const getBasicData = () => {
  return service({
    url: '/mock/basicUser.json',
    method: 'get'
  })
}

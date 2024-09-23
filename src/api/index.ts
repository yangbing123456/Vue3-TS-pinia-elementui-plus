import service from '@/untils/request'

/**
 *
 * @description:mock用户管理接口
 */
export const getUserData = () => {
  return service({
    url: '/mock/user.json',
    method: 'get'
  })
}

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

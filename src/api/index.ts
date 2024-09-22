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

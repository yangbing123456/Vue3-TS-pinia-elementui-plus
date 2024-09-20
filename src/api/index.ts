import service from '@/untils/request'

export const getUserData = () => {
  return service({
    url: '/mock/user.json',
    method: 'get'
  })
}

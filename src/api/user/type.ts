export interface UserResult {
  success: boolean
  data: {
    /** 头像 */
    avatar: string
    /** 用户名 */
    username: string
    /** 昵称 */
    nickname: string
    /** 当前登录用户的角色 */
    roles: Array<string>
    /** 按钮级别权限 */
    permissions: Array<string>
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date
  }
}

export interface RefreshTokenResult {
  success: boolean
  data: {
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date
  }
}

export interface Login {
  username: string
  password: string
}

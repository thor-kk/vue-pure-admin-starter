import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/dict',
    method: 'get',
    timeout: 500,
    response: () => {
      return {
        success: true,
        data: {
          data: [
            { dictName: '性别', dictCode: 'gender', status: true, remark: '内置字典' },
            { dictName: '状态', dictCode: 'status', status: false, remark: '内置字典' }
          ],
          total: 2
        }
      }
    }
  }
])

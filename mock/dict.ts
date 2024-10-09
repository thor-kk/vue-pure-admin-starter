import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/dict',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: { data: [{ dictName: '性别', dictCode: 'gender' }], total: 1 }
      }
    }
  }
])

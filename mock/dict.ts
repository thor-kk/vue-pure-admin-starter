import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/dict/list',
    method: 'get',
    timeout: 500,
    response: () => {
      return {
        success: true,
        data: {
          data: [
            { dictName: '性别', dictCode: 'gender', status: true, remark: '内置字典' },
            { dictName: '状态', dictCode: 'status', status: false, remark: '内置字典' },
            { dictName: '标识符', dictCode: 'identifier', status: true, remark: '字典标识符' }
          ],
          total: 2
        }
      }
    }
  },
  {
    url: '/dict',
    method: 'get',
    timeout: 500,
    response: ({ query }) => {
      if (query.key === 'status') {
        return {
          success: true,
          data: {
            data: [
              { label: '已启用', value: true, color: '#67c23a', identifier: 'active' },
              { label: '未启用', value: false, color: '#f56c6c', identifier: 'inactive' }
            ],
            total: 2
          }
        }
      }

      if (query.key === 'identifier') {
        return {
          success: true,
          data: {
            data: [
              { label: '激活', value: 'active' },
              { label: '未激活', value: 'inactive' }
            ],
            total: 2
          }
        }
      }

      return {
        success: true,
        data: { data: [], total: 0 }
      }
    }
  }
])

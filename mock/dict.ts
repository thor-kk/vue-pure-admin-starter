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
              {
                id: '1',
                dictItemName: '已启用',
                dictItemValue: true,
                status: true,
                color: '#67c23a',
                sort: 1,
                identifier: 'active'
              },
              {
                id: '2',
                dictItemName: '未启用',
                dictItemValue: false,
                status: true,
                color: '#f56c6c',
                sort: 2,
                identifier: 'inactive'
              }
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
              {
                id: '1',
                dictItemName: '激活',
                dictItemValue: 'active',
                status: true,
                color: '',
                sort: 1,
                identifier: ''
              },
              {
                id: '2',
                dictItemName: '未激活',
                dictItemValue: 'inactive',
                status: true,
                color: '',
                sort: 2,
                identifier: ''
              }
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
  },
  {
    url: '/dict/item',
    method: 'delete',
    timeout: 500,
    response: () => {
      return {
        success: true,
        data: null
      }
    }
  }
])

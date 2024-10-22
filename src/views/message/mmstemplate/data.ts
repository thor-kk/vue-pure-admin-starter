export const columns: TableColumnList = [
  {
    label: '勾选列', // 如果需要表格多选，此处label必须设置
    type: 'selection',
    fixed: 'left',
    reserveSelection: true // 数据刷新后保留选项
  },
  {
    label: '模板编号',
    prop: 'no'
  },
  {
    label: '短信模板',
    prop: 'title'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '操作',
    fixed: 'right',
    slot: 'operation'
  }
]

import { PlusColumn } from 'plus-pro-components'
import { handleDescEl, handleFormEl, handleTableEl, plusEl } from './el'
import { ProColumns } from './type'

export function handleTableColumns(columns: ProColumns[], tableIndex, tableBtn) {
  /** 过滤 */
  const filterColumns = columns.filter((item) => !item.hideTable)

  /** 序号列 */
  if (tableIndex) {
    filterColumns.unshift({ label: '序号', prop: 'index', type: 'index', width: 60, fixed: 'left' })
  }

  /** 操作列 */
  if (tableBtn && tableBtn.length > 0) {
    filterColumns.push({ label: '操作', prop: 'operation', fixed: 'right', slot: { table: true } })
  }

  const tableColumns = filterColumns.map((item) => {
    /** CRUD */
    if (item.actionCode === 'detail') {
      if (!item.el) item.el = {}
      item.el.table = 'link'

      if (!item.elProps) {
        item.elProps = {}
        item.elProps.table = { type: 'primary' }
      }
    }

    /** 组件映射 */
    if (item.el?.table) item.el.table = handleTableEl(item.el.table)

    /** 格式化 */
    function handelFormatter() {
      if (item.formatter) {
        return (row) => item.formatter({ row })
      }

      if (item.dict?.table && item.options) {
        return (row) => item.options.find((dict) => dict.value === row[item.prop]).label
      }

      return undefined
    }

    return {
      ...item,
      formatter: handelFormatter(),
      slot: (item.el?.table || item.slot?.table) && item.prop
    }
  })

  return tableColumns
}

export function handleSearchColumns(columns: ProColumns[]) {
  const defaultValues = {}

  const filterColumns = columns.filter((item) => item.showSearch)

  const searchColumns = filterColumns.map((item) => {
    defaultValues[item.prop] = item.defaultValue?.search

    /** 字段映射 */
    return {
      ...item,
      valueType: item.el?.search ?? '',
      fieldProps: item.elProps?.search
    } as PlusColumn
  })

  return searchColumns
}

export function handleFormColumns(columns: ProColumns[]) {
  const defaultValues = {}
  const rules = {}

  const filterColumns = columns.filter((item) => !item.hideForm)

  const formColumns = filterColumns.map((item) => {
    defaultValues[item.prop] = item.defaultValue?.form
    rules[item.prop] = item.rule

    /** 组件映射 */
    if (plusEl.includes(item.el?.form as string)) {
      if (item.el?.form) item.el.form = handleFormEl(item.el.form)
      if (!item.slot) item.slot = {}
      item.slot.form = true
    }

    /** 字段映射 */
    return {
      ...item,
      valueType: item.el?.form ?? '',
      fieldProps: item.elProps?.form
    } as PlusColumn
  })

  return { formColumns, defaultValues, rules }
}

export function handleDescColumns(columns: ProColumns[]) {
  const filterColumns = columns.filter((item) => !item.hideDesc)

  const descColumns = filterColumns.map((item) => {
    /** 组件映射 */
    if (plusEl.includes(item.el?.desc as string)) {
      if (item.el?.desc) item.el.desc = handleDescEl(item.el.desc)
      if (!item.slot) item.slot = {}
      item.slot.desc = true
    }

    /** 字段映射 */
    return {
      ...item,
      formatter: item.formatter ? (_, col) => item.formatter({ row: col.row }) : undefined,
      valueType: item.el?.desc ?? '',
      fieldProps: item.elProps?.desc
    } as PlusColumn
  })

  return descColumns
}

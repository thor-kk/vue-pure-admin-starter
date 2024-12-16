import type { Action, ProPageColumn } from './type'

import { PlusColumn } from 'plus-pro-components'
import { ProColumn, ProEditFormInstance } from '@/components'

export function useTableHook(columns: ProPageColumn[]) {
  const tableData = ref([])
  const pagination = ref<any>({})
  const total = ref(0)
  const tableRef = ref()

  /** 过滤 */
  const filterColumns = columns.filter((item) => !item.hide?.table)

  const tableColumns = computed(() =>
    filterColumns.map((item) => {
      /** CRUD */
      if (item.actionCode === 'detail') {
        if (!item.el) item.el = {}
        item.el.table = 'link'

        if (!item.elProps) {
          item.elProps = {}
          item.elProps.table = { type: 'primary' }
        }
      }

      /** 字段映射 */
      return {
        ...item,
        el: item.el?.table,
        elProps: item.elProps?.table,
        disabled: item.disabled?.table
      } as ProColumn
    })
  )

  return { tableColumns, tableData, pagination, total, tableRef }
}

export function useSearchHook(columns: ProPageColumn[]) {
  const searchData = ref({})

  const filterColumns = columns.filter((item) => item.hide?.search === false)

  const searchColumns = computed(() =>
    filterColumns.map((item) => {
      /** 设置默认值 */
      searchData.value[item.prop] = item.defaultValue?.search

      delete item.rules

      /** 字段映射 */
      return {
        ...item,
        valueType: item.el?.search ?? '',
        fieldProps: item.elProps?.search,
        disabled: item.disabled?.search
      } as PlusColumn
    })
  )

  return { searchColumns, searchData }
}

export function useFormHook({ columns, title }: { columns: ProPageColumn[]; title: string }) {
  const formRef = ref<ProEditFormInstance>()
  const formData = ref({})
  const formTitle = ref(title)
  const formConfirmApi = ref()

  const filterColumns = columns.filter((item) => !item.hide?.form)

  const formColumns = computed(() =>
    filterColumns.map((item) => {
      /** 字段映射 */
      return {
        ...item,
        defaultValue: item.defaultValue?.form,
        el: item.el?.form ?? '',
        elProps: item.elProps?.form,
        disabled: item.disabled?.form
      } as PlusColumn
    })
  )

  return { formColumns, formTitle, formData, formRef, formConfirmApi }
}

export function useDescHook({ columns, title }: { columns: ProPageColumn[]; title: string }) {
  const descVisible = ref(false)
  const descData = ref()
  const descTitle = computed(() => title + '详情')

  const filterColumns = columns.filter((item) => !item.hide?.desc)

  const descColumns = computed(() =>
    filterColumns.map((item) => {
      /** 字段映射 */
      return {
        ...item,
        el: item.el?.desc ?? '',
        elProps: item.elProps?.desc,
        disabled: item.disabled?.desc
      } as PlusColumn
    })
  )

  return { descColumns, descVisible, descData, descTitle }
}

export function useActionHook(args: { mainAction?: Action[]; tableAction?: Action[]; title: string }) {
  const { mainAction, tableAction, title } = args
  console.log('🚀 ~ useActionHook ~ tableAction:', tableAction)
  console.log('🚀 ~ useActionHook ~ mainAction:', mainAction)

  const _mainAction = computed(() =>
    mainAction.map((item) => {
      if (item.code === 'create') item.text = '新增' + title
      return item
    })
  )

  const _tableAction = computed(() =>
    tableAction.map((item) => {
      if (item.code === 'update') item.text = '修改'
      if (item.code === 'delete') item.text = '删除'
      return item
    })
  )

  return { mainAction: _mainAction, tableAction: _tableAction }
}

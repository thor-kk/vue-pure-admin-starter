import { PlusColumn } from 'plus-pro-components'
import { ProPageColumn } from './type'
import { ProEditFormInstance } from '@/components'

/** 分页表格 */
export function useTableHook(columns: ProPageColumn[]) {
  const tableData = ref([])
  const pagination = ref<any>({})

  /** 过滤 */
  const filterColumns = columns.filter((item) => !item.hideTable)

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
        elProps: item.elProps?.table
      } as any
    })
  )

  return { tableColumns, tableData, pagination }
}

/** 查询表单 */
export function useSearchHook(columns: ProPageColumn[]) {
  /** 表单数据 */
  const searchForm = ref({})

  const filterColumns = columns.filter((item) => item.showSearch)

  const searchColumns = computed(() =>
    filterColumns.map((item) => {
      /** 设置默认值 */
      searchForm.value[item.prop] = item.defaultValue?.search

      /** 字段映射 */
      return {
        ...item,
        valueType: item.el?.search ?? '',
        fieldProps: item.elProps?.search
      } as PlusColumn
    })
  )

  return { searchColumns, searchForm }
}

/** 编辑表单 */
export function useFormHook({ columns, title }: { columns: ProPageColumn[]; title: string }) {
  const formRef = ref<ProEditFormInstance>()
  const formData = ref({})
  const formTitle = ref(title)
  const formConfirmApi = ref()

  const filterColumns = columns.filter((item) => !item.hideForm)

  const formColumns = computed(() =>
    filterColumns.map((item) => {
      /** 字段映射 */
      return {
        ...item,
        defaultValue: item.defaultValue?.form,
        el: item.el?.form ?? '',
        elProps: item.elProps?.form
      } as PlusColumn
    })
  )

  return { formColumns, formTitle, formData, formRef, formConfirmApi }
}

/** 描述列表 */
export function useDescHook({ columns, title }: { columns: ProPageColumn[]; title: string }) {
  const descVisible = ref(false)
  const descData = ref()
  const descTitle = computed(() => title + '详情')

  const filterColumns = columns.filter((item) => !item.hideDesc)

  const descColumns = computed(() =>
    filterColumns.map((item) => {
      /** 字段映射 */
      return {
        ...item,
        el: item.el?.desc ?? '',
        elProps: item.elProps?.desc
      } as PlusColumn
    })
  )

  return { descColumns, descVisible, descData, descTitle }
}

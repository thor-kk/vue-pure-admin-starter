/*
 * @Author: Yyy
 * @Date: 2024-10-14 10:42:11
 * @LastEditTime: 2024-10-14 10:46:35
 * @Description: Pro - 消息确认
 */

import { ElMessageBox } from 'element-plus'

export async function ProMessageBox(options: { type: 'delete' }): Promise<boolean> {
  try {
    if (options.type === 'delete') {
      const isConfirm = await ElMessageBox.confirm('请确认是否删除', '警告（此操作不可逆）', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        customStyle: { top: '-15vh' }
      })

      if (isConfirm === 'confirm') return true
    }
  } catch (error) {
    return false
  }
}

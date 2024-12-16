/**
 * @description: 树形数组根据唯一值查找对象
 */
export function findTreeItem({ tree, prop, value }: { tree: any; prop: any; value: any }) {
  for (const item of tree) {
    if (item[prop] === value) return item

    if (item.children && item.children.length > 0) {
      const find = findTreeItem({ tree: item.children, prop, value })
      if (find) return find
    }
  }

  return undefined
}

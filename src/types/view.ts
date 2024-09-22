export interface viewObj {
  prop: string
  label: string
}

/**
 * @description:查看详情弹窗规则
 */
export interface view {
  row: Object
  list: Array<viewObj>
}

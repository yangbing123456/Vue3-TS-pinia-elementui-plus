export interface Menu {
  id: number
  pid?: string
  icon?: string
  index: string
  title: string
  permiss?: string
  children?: Menu[]
}

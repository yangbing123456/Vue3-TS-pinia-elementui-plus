import { defineStore } from 'pinia'
export const useHeaderStore = defineStore('header', {
  state() {
    return {
      collapse: false,
      bgColor: '#545c64',
      textColor: '#fff',
      activeColor: '#ffd04b'
    }
  },
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse
    }
  }
})

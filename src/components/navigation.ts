import Alpine from 'alpinejs'

export const navigation = () => ({
  currentTab: Alpine.$persist('home') as unknown as string,

  // Change the current tab
  changeTab(tab: string) {
    this.currentTab = tab
  }
})

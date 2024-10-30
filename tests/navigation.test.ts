import Alpine from 'alpinejs'
import { navigation } from '../src/components/navigation'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

describe('navigation component', () => {
  let navigationInstance: ReturnType<typeof navigation>

  beforeEach(() => {
    navigationInstance = navigation()
  })

  it("should initialize with 'home' as the current tab", () => {
    expect(navigationInstance.currentTab).toBe('home')
  })

  it('should change the current tab', () => {
    navigationInstance.changeTab('products')
    expect(navigationInstance.currentTab).toBe('products')

    navigationInstance.changeTab('home')
    expect(navigationInstance.currentTab).toBe('home')
  })
})

import { mount } from '@vue/test-utils'
import Home from './components/Home'

describe('Home', () => {
  
  const wrapper = mount(Home)  
  
  test('recipes are being fetched', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.recipes.length > 0).toBe(true)
  })
  
  test('ingredients are being fetched', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.ingredients.length > 0).toBe(true)
  })
  
  test('recipe button functional', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.viewRecipes).toBe(true)
  })

})

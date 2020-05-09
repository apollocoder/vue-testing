import HelloWorld from '@/components/HelloWorld.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

const axios = require('axios')

jest.mock('axios', () => ({
	get: jest.fn(() => Promise.resolve([]))
}))

describe('HelloWorld.vue', () => {
	it('renders msg prop', () => {
		const msg = 'new message'
		const wrapper = shallowMount(HelloWorld, {
			propsData: { msg }
		})
		expect(wrapper.text()).toMatch(msg)
	})

	it('renders user list', async () => {
		axios.get.mockResolvedValue({
			data: [
				{ id: 1, email: 'douglas.adams@earth.com' },
				{ id: 2, email: 'arthur.dent@earth.com' }
			]
		})
		const wrapper = shallowMount(HelloWorld)

		await flushPromises()

		expect(wrapper.html()).toContain('arthur.dent@earth.com')
		expect(wrapper.html()).toContain('douglas.adams@earth.com')
	})

	it('renders todos after click', async () => {
		axios.get.mockResolvedValue({
			data: [
				{ id: 1, title: 'Get off earth' },
				{ id: 42, title: 'Find the answer' }
			]
		})
		const wrapper = shallowMount(HelloWorld)

		wrapper.find('button').trigger('click')
		await flushPromises()

		expect(wrapper.html()).toContain('Get off earth')
		expect(wrapper.html()).toContain('Find the answer')
	})
})

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import CardsByPeriod from '../src/components/CardsByPeriod.vue'

vi.mock('@/api/CardsByPeriodAPI.ts', () => ({
    fetchCardsByPeriod: vi.fn().mockResolvedValue({
        createdTaskCount: 5,
        completedTaskCount: 3
    })
}))

describe('CardsByPeriod.vue', () => {
    it('atualiza as datas corretamente', async () => {
        const wrapper = mount(CardsByPeriod)

        await wrapper.find('#start-date').setValue('2023-01-01')
        await wrapper.find('#end-date').setValue('2023-01-31')

        expect(wrapper.vm.startDate).toBe('2023-01-01')
        expect(wrapper.vm.endDate).toBe('2023-01-31')
    })

    it('atualiza o gráfico com dados da API', async () => {
        const wrapper = mount(CardsByPeriod)

        wrapper.vm.startDate = '2023-01-01'
        wrapper.vm.endDate = '2023-01-31'

        await wrapper.vm.updateChartData()

        expect(wrapper.vm.chartData.datasets[0].data[0]).toBe(5)
        expect(wrapper.vm.chartData.datasets[1].data[0]).toBe(3)
    })
})
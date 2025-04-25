import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CardsByPeriod from '../src/components/CardsByPeriod.vue'

vi.mock('@/api/CardsByPeriodAPI.ts', () => ({
    fetchCardsByPeriod: vi.fn().mockResolvedValue({
        createdTaskCount: 5,
        completedTaskCount: 3
    })
}))

test('Deve atualizar corretamente as datas inseridas nos campos de início e fim', async() => {
    //Arrange
    const wrapper = mount(CardsByPeriod);
    const startDateInput = wrapper.find('#start-date');
    const endDateInput = wrapper.find('#end-date');

    //Act
    await startDateInput.setValue('2023-01-01');
    await endDateInput.setValue('2023-01-31');

    //Assert
    expect(wrapper.vm.startDate).toBe('2023-01-01');
    expect(wrapper.vm.endDate).toBe('2023-01-31');
})

test('Deve atualizar o gráfico com dados da API', async () => {
    //Arrange
    const wrapper = mount(CardsByPeriod);
    wrapper.vm.startDate = '2023-01-01'
    wrapper.vm.endDate = '2023-01-31'

    //Act
    await wrapper.vm.updateChartData()

    //Assert
    expect(wrapper.vm.chartData.datasets[0].data[0]).toBe(5)
    expect(wrapper.vm.chartData.datasets[1].data[0]).toBe(3)

})
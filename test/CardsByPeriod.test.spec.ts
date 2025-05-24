import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CardsByPeriod from '../src/components/CardsByPeriod.vue'

vi.mock('@/api/CardsByPeriodAPI.ts', () => ({
    fetchCardsByPeriod: vi.fn().mockResolvedValue({
        createdTaskCount: 5,
        completedTaskCount: 3
    })
}))

test('Should correctly update the dates entered in the start and end fields.', async() => {
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

test('Should update the chart with data from the API', async () => {
    //Arrange
    const wrapper = mount(CardsByPeriod, {
        props: {
            value: [ { projectId: 1, projectName: 'Test Project' } ]
        }
    });

    wrapper.vm.startDate = '2023-01-01';
    wrapper.vm.endDate = '2023-01-31';
    wrapper.vm.selectedProject = 1;

    // Act
    await wrapper.vm.updateChartData();

    // Assert
    expect(wrapper.vm.chartData.datasets[0].data[0]).toBe(5);
    expect(wrapper.vm.chartData.datasets[1].data[0]).toBe(3);

})
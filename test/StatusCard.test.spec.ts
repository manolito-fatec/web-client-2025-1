import { mount } from '@vue/test-utils';
import { expect, test, vi, beforeEach } from 'vitest';
import StatusCard from '../src/components/StatusCard.vue';
import { fetchStatusCard } from '../src/api/StatusCardApi';

// Mock API module
vi.mock('../src/api/StatusCardApi', () => ({
  fetchStatusCard: vi.fn()
}));

const mockApiData = [
  { statusName: 'New', count: 10 },
  { statusName: 'In Progress', count: 5 },
  { statusName: 'Ready for Test', count: 8 },
  { statusName: 'Closed', count: 12 },
  { statusName: 'Needs Info', count: 3 }
];

beforeEach(() => {
  vi.clearAllMocks();
});

test('Should update the chart with data from the API', async () => {
  //Arrange
  (fetchStatusCard as any).mockResolvedValue(mockApiData);
  const wrapper = mount(StatusCard);
  wrapper.vm.selectedProject = 1637322;

  //Act
  await wrapper.vm.updateChart(wrapper.vm.selectedProject);

  //Assert
  expect(wrapper.vm.chartData.datasets[0].data).toEqual([10, 5, 8, 12, 3]);
  expect(fetchStatusCard).toHaveBeenCalledWith(1637322);
});

test('Should display zeros if the API fails', async () => {
  //Arrange
  (fetchStatusCard as any).mockRejectedValue(new Error('API error'));
  const wrapper = mount(StatusCard);
  wrapper.vm.selectedProject = 1637322;

  //Act
  await wrapper.vm.updateChart(wrapper.vm.selectedProject);

  //Assert
  expect(wrapper.vm.chartData.datasets[0].data).toEqual([0, 0, 0, 0, 0]);
  expect(fetchStatusCard).toHaveBeenCalledWith(1637322);
});

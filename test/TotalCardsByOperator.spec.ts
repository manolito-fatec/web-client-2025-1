import { mount } from '@vue/test-utils';
import { expect, test, vi, beforeEach } from 'vitest';
import TotalCardsOperator from '../src/components/TotalCardsByOperator.vue';
import { fetchTotalOfCards } from '../src/api/TotalCardsOperatorApi';

// Mock API module
vi.mock('../src/api/TotalCardsOperatorApi', () => ({
  fetchTotalOfCards: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test('Should update the total when a valid operator is selected', async () => {
  // Arrange
  (fetchTotalOfCards as any).mockResolvedValue(15);
  const wrapper = mount(TotalCardsOperator);
  wrapper.vm.operadorSelecionado = 2;

  // Act
  await wrapper.vm.carregarTotal(wrapper.vm.operadorSelecionado);

  // Assert
  expect(wrapper.vm.totalRef).toBe(15);
  expect(fetchTotalOfCards).toHaveBeenCalledWith(2);
});

test('Should set total to 0 when API fails', async () => {
  // Arrange
  (fetchTotalOfCards as any).mockRejectedValue(new Error('API error'));
  const wrapper = mount(TotalCardsOperator);
  wrapper.vm.operadorSelecionado = 2;

  // Act
  await wrapper.vm.carregarTotal(wrapper.vm.operadorSelecionado);

  // Assert
  expect(wrapper.vm.totalRef).toBe(0);
  expect(fetchTotalOfCards).toHaveBeenCalledWith(2);
});

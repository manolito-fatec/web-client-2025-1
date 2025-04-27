<script setup lang="ts">
import { fetchTotalOfCards } from '../api/TotalCardsOperatorApi';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const operadores = ref([
  { id: 1, nome: 'André' },
  { id: 2, nome: 'Beatriz' },
  { id: 3, nome: 'Cauê' },
  { id: 4, nome: 'Gabriel' },
]);

const operadorSelecionado = ref<number | null>(null);
const totalRef: Ref<number> = ref(0);

const carregarTotal = async (userId: number) => {
  try {
    const total = await fetchTotalOfCards(userId);
    totalRef.value = total !== undefined ? total : 0;
  } catch (error) {
    console.error("Erro ao buscar total de cartões:", error);
    totalRef.value = 0;
  }
};

watch(operadorSelecionado, (novoId) => {
  if (novoId !== null) {
    carregarTotal(novoId);
  }
});
</script>

<template>
  <div class="total-card operador">
    <div class="title">Total cards by Operator</div>

    <select v-model="operadorSelecionado">
      <option disabled value="">Select an operator</option>
      <option 
        v-for="operador in operadores" 
        :key="operador.id" 
        :value="operador.id"
      >
        {{ operador.nome }}
      </option>
    </select>

    <div class="value">{{ totalRef }}</div>
  </div>
</template>

<style scoped>
.total-card.operador {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1em;
  color: #3D7EFF;
  margin-bottom: 10px;
  font-weight: bold;
}

select {
  background-color: #0A1237;
  color: white;
  font-size: 0.9rem;
  padding: 0.02rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  width: 80%;
  text-align: center;
}

.value {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff;
  margin-top: 5px;
}
</style>

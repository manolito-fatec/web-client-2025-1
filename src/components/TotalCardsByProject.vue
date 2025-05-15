<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

const projetos = ref([
  { id: 1, nome: '5° Semestre' },
  { id: 2, nome: 'Teste_Manolito' }
])

const projetoSelecionado = ref<number | null>(null)

const totalRef: Ref<number> = ref(0)

const fetchTotalDeCardsPorProjeto = async (projetoId: number): Promise<number> => {
  const mockData: Record<number, number> = {
    1: 12,
    2: 0,
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData[projetoId] ?? 0), 500)
  })
}

const carregarTotal = async (projetoId: number) => {
  try {
    const total = await fetchTotalDeCardsPorProjeto(projetoId)
    totalRef.value = total
  } catch (error) {
    console.error("Erro ao buscar total de cartões:", error)
    totalRef.value = 0
  }
}

watch(projetoSelecionado, (novoId) => {
  if (novoId !== null) {
    carregarTotal(novoId)
  }
})
</script>

<template>
  <div class="total-card project">
    <div class="title">Total cards by Project</div>

    <select v-model="projetoSelecionado">
      <option disabled value="">Select a project</option>
      <option 
        v-for="projeto in projetos" 
        :key="projeto.id" 
        :value="projeto.id"
      >
        {{ projeto.nome }}
      </option>
    </select>

    <div class="value">{{ totalRef }}</div>
  </div>
</template>

<style scoped>
.total-card.project {
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
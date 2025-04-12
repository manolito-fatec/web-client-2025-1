<script setup lang="ts" generic="T extends string | number">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  options: T[]
  modelValue: T
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  const emittedValue = (typeof props.modelValue === 'number' ? Number(value) : value) as T
  emit('update:modelValue', emittedValue)
}
</script>

<template>
  <select 
    class="chart-select"
    :value="modelValue"
    @input="handleInput"
  >
    <option 
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

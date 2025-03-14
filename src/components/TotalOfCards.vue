<script lang="ts">
import {type Ref, ref} from "vue";

const toc:Ref<number> = ref(0);
const tec:Ref<string> = ref('Total of Cards');
toc.value = 10;

export default {
  name: "TotalOfCards",
  setup(){
    return {toc, tec};
  }
}
</script>
<template>
  <div class="total-of-cards">
    <h1>{{ tec }}</h1>
    <span>{{ toc }}</span>
  </div>
</template>
<style lang="scss" scoped>
.total-of-cards {
  background-color: #01081F;
  border-radius: 10px;
  flex-direction: column;
  width: 11rem;
  height: 6rem;
  display: flex;
  align-items: center;

  h1 {
    font-size: 1rem;
    color: #3D7EFF;
  
  }
  font-size: 2rem;
    color: #fff;


}

</style>
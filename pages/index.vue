<template>
  <div class="container">
    <div class="selector_container">
      <div v-for="(el, id) in state" :key="id"
      @click="currentLang = id" class="selector_el btn" :class="currentLang == id ? 'selector_active' : ''">
        {{id }}
      </div>
    </div>
    <div class="selector_container">
      <div v-for="(el, id) in state[currentLang]" :key="id"
      @click="currentRole = id" class="selector_el btn" :class="currentRole == id ? 'selector_active' : ''">
        {{id }}
      </div>
    </div>
    <div :style="currentRole != '' ? 'padding: 10px' : 'padding: 0px'" class="guide_container">
      <div v-for="(el, id) in state[currentLang][currentRole]" 
      :key="id" @click="useList(id)" class="guide_el">
        <div class="el_question">Q:&nbsp;{{ id }}</div>
        <div v-if="expandList.includes(id)" class="el_answer">A:&nbsp;{{ el }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const state = useStore();
const currentLang = ref('ru');
const currentRole = ref('');
const expandList = ref([]);

const useList = (el) => {
  expandList.value.includes(el) ? expandList.value = expandList.value.filter(el_f => el_f != el) : expandList.value.push(el);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.selector_container {
  background-color: var(--main-text-color);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}
.selector_active {
  filter: hue-rotate(120deg);
}
.guide_container {
  background-color: var(--main-text-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 15px;
  /* padding: 10px; */
  transition: all 0.3s ease-in-out;
}
.guide_el {
  border: 1px solid var(--off-text-color);
  color: var(--off-bg-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  padding: 10px;
  border-radius: 12px; 
  /* // prevent selection start */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
 /* // prevent selection end */
 cursor: pointer;
 transition: all 0.3s ease-in-out;
}
.el_answer {
  border-top: 1px dotted var(--accent-color);
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
}
</style>
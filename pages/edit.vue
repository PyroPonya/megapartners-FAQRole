<template>
  <div class="edit_container">
    <p>edit page</p>
    <input v-model="someData" type="text">
    <br/>
    <button @click="testSave">SAVE</button>
    <br/>
    <button @click="testLoad">LOAD</button>
  </div>
</template>

<script setup>
const someData = ref('');
const testSave = async () => {
  await useStorage().setItem('test:foo', { testData: someData.value })
}
const testLoad = async () => {
  someData.value = await useStorage().getItem('test:foo')
}
</script>

<style scoped>
</style>

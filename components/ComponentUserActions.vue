<template>
  <div class="actions_container">
    <NuxtLink to="/">
      <div @click="currActivePage = 'read'" class="btn" :class="currActivePage == 'read' ? 'selector_active' : ''">Read</div>
    </NuxtLink>
    <NuxtLink to="/edit">
      <div @click="currActivePage = 'edit'" class="btn" :class="currActivePage == 'edit' ? 'selector_active' : ''">Edit</div>
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const currActivePage = ref(route.name == 'edit' ? 'edit' : 'read');
</script>

<style scoped>
.actions_container {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
}
</style>

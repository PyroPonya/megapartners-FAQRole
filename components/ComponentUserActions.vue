<template>
  <div class="actions_container">
    <NuxtLink to="/">
      <div class="btn">Read</div>
    </NuxtLink>
    <NuxtLink to="/edit">
      <div class="btn">Edit</div>
    </NuxtLink>
  </div>
</template>

<script setup>

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
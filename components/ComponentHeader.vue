<template>
  <div class="header_container">
    <div class="header">
      <div class="logo">megaLOGO</div>
      <h2>Slots. FAQs by role</h2>
      <ComponentUserActions />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* width: 100vw; */
  padding: 10px 0px;
  /* border-bottom: 1px solid var(--accent-color); */
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  /* min-width: 100vw; */
  max-width: 1024px;
}
.logo {
  height: 50px;
  min-width: 50px;
  padding: 0px 10px;
  background-color: var(--off-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
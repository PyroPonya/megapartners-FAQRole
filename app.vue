<template>
  <div class="app_container">
    <div class="app_content">
      <ComponentHeader />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Slots.FAQr(ole)',
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});
</script>

<style>
/* import default styles & resets start */
@import '~/assets/style.css';
/* import default styles & resets end */
* {
  /* coolors.co */
  --main-bg-color: #F0C987;
  --off-bg-color: #89BD9E;
  --main-text-color: #3C153B;
  --off-text-color: #8B1E3F;
  --accent-color: #DB4C40;
}
body {
  background-color: var(--main-bg-color);
}
.app_container {
  position: relative;
}
.app_content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 15px 0;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 12px; 
  background-color: var(--off-text-color);
  color: var(--off-bg-color);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.btn:hover {
  color: var(--off-text-color);
  background-color: var(--off-bg-color);
  border-radius: 6px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

input,
button,
textarea,
select {
  font: inherit;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
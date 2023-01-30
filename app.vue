<template>
  <div class="app_container">
    <div v-if="showBlocker" class="app_blocker_container">
      <div class="app_blocker">
        <label for="access">Please enter the acess code:</label>
        <input v-model="code" id="access" type="text" autocomplete="off">
        <div @click="requestAccess()" class="btn">Request Access</div>
      </div>
    </div>
    <div v-if="cookie" class="app_content">
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
const code = ref('');
const cookie = useCookie('access_allowed',
{
  maxAge: 86400,
});
const showBlocker = ref(cookie.value ? false : true);
const requestAccess = () => {
  if (code.value == 'mega') {
    cookie.value = 'access_allowed';
    showBlocker.value = false;
    return true;
  } else {
    return false;
  }
};

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
  min-width: 360px;
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
  /* // prevent selection start */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
 /* // prevent selection end */
}
.btn:hover {
  color: var(--off-text-color);
  background-color: var(--off-bg-color);
  border-radius: 6px;
}
.btn-disabled {
  filter: grayscale(100%);
}
.btn-disabled:hover {
  cursor: not-allowed;
  background-color: var(--off-text-color);
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
.selector_active {
  filter: hue-rotate(120deg);
}
.app_blocker_container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(184, 121, 121, 0.7);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 5%;

}
.app_blocker {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
  padding: 5%;
  gap: 15px;
}
</style>

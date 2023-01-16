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
const state = useState();

const useRedis = (method = 'get') => {
  const data = JSON.stringify(state.value);
  fetch(`https://eu2-cuddly-gull-30876.upstash.io/${method}/Megapartners_FAQ${method != 'get' ? '/' + data : ''}`, {
  headers: {
    Authorization: "Bearer AXicACQgZGFmMTVkMDgtNDhkYi00MjA1LWFiZTAtM2QyNDE1ZjdmODc5YTBjMTA5YmY4YzllNDZmMTg4N2VlNzIxNWY3ZDljNGE="
  }
}).then(response => response.json())
  .then(data => {
    if (method == 'get') {
      state.value = JSON.parse(data.result);
    } else {
      console.warn('Something went wrong hole dude: *app.vue');
    }
  });
}
onMounted(() => {
  // @TODO: TURN IT ON DUH
  // useRedis();
  // let theWord = prompt('say the code word!');
  // if (theWord !== 'gachiboychick') {
  //   location.assign('https://www.google.com/search?newwindow=1&sxsrf=AJOqlzVlx9rm1qhzDk6xr00oh6sPFhwd8Q:1673729854028&q=gachimuchi&tbm=vid&sa=X&ved=2ahUKEwiAz5jL-cf8AhVy-IsKHVpOA24Q0pQJegQIDBAB&biw=1920&bih=937');
  // }
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
</style>

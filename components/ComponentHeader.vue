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
// @HERE: Loading state data from server
const state = useStore();
const useRedis = (method = 'set') => {
  if (method == 'set') {
    if (!window.confirm("Do you really want to update database with your current data?")) {
      return false;
    }
  }

  const data = JSON.stringify(state.value);
  // for backup data: [backup]Megapartners_FAQ
  const request = fetch(`https://eu2-cuddly-gull-30876.upstash.io/${method}/Megapartners_FAQ${method != 'get' ? '/' + data : ''}`, {
  headers: {
    Authorization: "Bearer AXicACQgZGFmMTVkMDgtNDhkYi00MjA1LWFiZTAtM2QyNDE1ZjdmODc5YTBjMTA5YmY4YzllNDZmMTg4N2VlNzIxNWY3ZDljNGE="
  }
}).then(response => response.json())
  .then(data => {
    if(method == 'get') {
      // console.log(data.result);
      // @TODO: HERE
      state.value = JSON.parse(data.result);
    } else {
      console.warn('Header Alert!');
      console.warn(data);
    }
  });
}
onMounted(() => {
  useRedis('get');
})
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

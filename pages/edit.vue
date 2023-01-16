<template>
  <div class="edit_container">
    <div class="selector_container">
      <div v-for="(el, id) in state" :key="id"
      @click="currentLang = id" class="selector_el btn" :class="currentLang == id ? 'selector_active' : ''">
        {{id }}
      </div>
      <div class="button_container">
        <div @click="currentLang !== '' && currentRole !== '' ? showPopup = true : ''" class="btn">ADD RULE<div class="emoji">🌈</div></div>
        <div @click="useRedis('get')" class="btn">GLOBAL GET <div class="emoji">📥</div></div>
        <div @click="useRedis('set')" class="btn">GLOBAL POST <div class="emoji">📤</div></div>
      </div>
      </div>
    <div class="selector_container">
      <div v-for="(el, id) in state[currentLang]" :key="id"
      @click="currentRole = id" class="selector_el btn" :class="currentRole == id ? 'selector_active' : ''">
        {{id }}
      </div>
    </div>
    <br/>
    {{ contentShowage }}
    <div :style="currentRole != '' ? 'padding: 10px' : 'padding: 0px'" class="guide_container">
      <div v-for="(el, id, index) in state[currentLang][currentRole]" 
      :key="id" @click="useList(id)" class="guide_el">
        <div :currentEditQuestioin="id" class="el_question">
          Q:&nbsp;{{ id }}
          <button @click="filterObject(state[currentLang][currentRole], id)" class="btn">Remove</button>
        </div>
        <div :currentEditAnswer="el" v-if="true" class="el_answer">
        <!-- <div :currentEditAnswer="el" contenteditable="true" v-if="expandList.includes(id)" class="el_answer"> -->
          A:&nbsp;{{ el }}
          <input v-model="state[currentLang][currentRole][id]" type="text">
        </div>
      </div>
    </div>
    <div :style="showPopup == false ? 'height: 0px; width: 0px; opacity: 0%; display: none;' : 'height: 600px; width: 100%; opacity: 100%; display: flex; flex-direction: column;'" class="popup">
      WHY HELLO THERE
      <label for="key">key</label>
      <input id="key" v-model="keyData" type="text">
      <br/>
      <label for="valeu">value</label>
      <input id="value" v-model="valueData" type="text">
      <div @click="addRule(keyData, valueData)" class="confirm_btn btn" :class="keyData == '' ? 'btn-disabled' : ''">Im pretty confident about this rule. Please add it, good Sir!</div>
    </div>
  </div>
</template>

<script setup>
const clog = (el) => {
  console.log(el);
}
const state = useStore();
const currentLang = ref('ru');
const currentRole = ref('');
const expandList = ref([]);
const keyData = ref('');
const valueData = ref('');
const showPopup = ref(false);

// maybe remove it later
const contentShowage = ref('');


const useRedis = (method = 'set') => {
  const data = JSON.stringify(state.value);
  // for backup data: [backup]Megapartners_FAQ
  const request = fetch(`https://eu2-cuddly-gull-30876.upstash.io/${method}/Megapartners_FAQ${method != 'get' ? '/' + data : ''}`, {
  headers: {
    Authorization: "Bearer AXicACQgZGFmMTVkMDgtNDhkYi00MjA1LWFiZTAtM2QyNDE1ZjdmODc5YTBjMTA5YmY4YzllNDZmMTg4N2VlNzIxNWY3ZDljNGE="
  }
}).then(response => response.json())
  .then(data => {
    if(method == 'get') {
      console.log(data.result);
      // state.value = JSON.parse(data.result);
      contentShowage.value = JSON.parse(data.result);
    } else {
      console.log(data);
      contentShowage.value = data.result;
    }
  });
}

const addRule = (key, value) => {
  if (keyData.value == '') {
    return false;
  }
  state.value[currentLang.value][currentRole.value][key] ? false :
  state.value[currentLang.value][currentRole.value][key] = value;
  keyData.value = '';
  valueData.value = '';
}

const useList = (el) => {
  expandList.value.includes(el) ? expandList.value = expandList.value.filter(el_f => el_f != el) : expandList.value.push(el);
};
const filterObject = (obj, key) => {
  delete obj[key];
};
</script>

<style scoped>
.edit_container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.selector_container {
  background-color: var(--main-text-color);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  gap: 15px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}
.selector_active {
  filter: hue-rotate(120deg);
}
.button_container {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  gap: 6px;
}
.button_container > .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}
.button_container > :first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.button_container > :last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
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
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.el_answer {
  border-top: 1px dotted var(--accent-color);
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.el_answer > input {
  height: 40px;
  padding: 5px 10px;
  border-radius: 12px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.el_question {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.emoji {
  font-size: 35px;
}
.confirm_btn {
  font-size: 25px;
}
</style>

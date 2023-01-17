<template>
  <div class="edit_container">
    <div class="selector_container">
      <div class="button_container">
        <div v-for="(el, id) in state" :key="id"
        @click="currentLang = id" class="selector_el btn" :class="currentLang == id ? 'selector_active' : ''">
          {{id }}
        </div>
        <div @click="usePopupAdd('lang')" class="selector_el btn plus_sign">+</div>
      </div>
      <div class="button_container no_wrap">
        <div v-if="currentLang !== '' && currentRole !== ''" @click="currentLang !== '' && currentRole !== '' ? showPopup = true : ''" class="btn">ADD RULE<div class="emoji">🌈</div></div>
        <div @click="useRedis('get')" class="btn">GLOBAL GET <div class="emoji">📥</div></div>
        <div @click="useRedis('set')" class="btn">GLOBAL POST <div class="emoji">📤</div></div>
      </div>
      </div>
    <div class="selector_container">
      <div class="button_container">
        <div v-for="(el, id) in state[currentLang]" :key="id"
        @click="currentRole = id" class="selector_el btn" :class="currentRole == id ? 'selector_active' : ''">
          {{id }}
        </div>
      </div>
      <div @click="usePopupAdd('role')" class="selector_el btn plus_sign">+</div>
    </div>
    <div :style="currentRole != '' ? 'padding: 10px' : 'padding: 0px'" class="guide_container">
      <div v-for="(el, id, index) in state[currentLang][currentRole]" 
      :key="id" @click="useList(id)" class="guide_el">
        <div :currentEditQuestioin="id" class="el_question">
          Q:&nbsp;{{ id }}
          <div @click="filterObject(state[currentLang][currentRole], id)" class="btn">Remove</div>
        </div>
        <div :currentEditAnswer="el" v-if="true" class="el_answer">
          A:&nbsp;{{ el }}
          <textarea v-model="state[currentLang][currentRole][id]" type="text"></textarea>
        </div>
      </div>
    </div>
    <div @click.self="showNewNamedElement = !showNewNamedElement; newNamedElement = '';" class="popup_menuAdd_container" :style="showNewNamedElement == true ? 'display: flex; width: 100vw; height: 100vh;' : 'display: none; width: 0vw; height: 0vh;'">
      <div class="popup_menuAdd">
        <label for="menuAdd">Who am i?</label>
        <input v-model="newNamedElement" id="menuAdd" type="text">
        <div @click="addNewVar()" class="btn">Add</div>
      </div>
    </div>
    <div @click.self="showPopup = !showPopup; keyData = ''; valueData = '';" class="popup_menuAdd_container" :style="showPopup == true ? 'display: flex; width: 100vw; height: 100vh;' : 'display: none; width: 0vw; height: 0vh;'">
      <div class="popup_menuAdd">
        <label for="key">Question for {{ currentRole }}:</label>
        <input id="key" v-model="keyData" type="text">
        <br/>
        <label for="valeu">Answer for {{ currentRole }}:</label>
        <textarea id="value" v-model="valueData" type="text"></textarea>
        <div @click="addRule(keyData, valueData)" class="confirm_btn btn" :class="keyData == '' ? 'btn-disabled' : ''">
          Im pretty confident about this rule. Please add it, good Sir!
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const state = useStore();
const currentLang = ref('ru');
const currentRole = ref('');
const expandList = ref([]);
const keyData = ref('');
const valueData = ref('');
const showPopup = ref(false);
const showNewNamedElement = ref(false);
const newNamedElement = ref('');
const tempAddRef = ref('');

const useRedis = (method = 'set') => {
  if (method == 'set') {
    if (!window.confirm("Do you really want to update database with your current data?")) {
      return false;
    }
  } else {
    if (!window.confirm("You are about to fetch fresh data from server! All local changes will be discarded! Are you sure?")) {
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
      console.log(data.result);
      // @TODO: HERE
      state.value = JSON.parse(data.result);
    } else {
      console.log(data);
    }
  });
}

const usePopupAdd = (val) => {
  console.log(val);
  if (val == 'lang') {
    tempAddRef.value = val;
    showNewNamedElement.value = !showNewNamedElement.value;
  } else if (val == 'role') {
    tempAddRef.value = val;
    showNewNamedElement.value = !showNewNamedElement.value;
  } else {
    console.warn('SOMETHING WRONG IS HAPPENING!')
  }
}

const addNewVar = () => {
  if (tempAddRef.value == 'lang') {
    if (newNamedElement.value == '') {
      showNewNamedElement.value = !showNewNamedElement.value;
      return false;
    }
    state.value[newNamedElement.value] = {};
    newNamedElement.value = '';
    tempAddRef.value = '';
    showNewNamedElement.value = !showNewNamedElement.value;
  } else if (tempAddRef.value == 'role') {
    if (newNamedElement.value == '') {
      showNewNamedElement.value = !showNewNamedElement.value;
      return false;
    }
    state.value[currentLang.value][newNamedElement.value] = {};
    newNamedElement.value = '';
    tempAddRef.value = '';
    showNewNamedElement.value = !showNewNamedElement.value;
  } else {
    console.warn('SOMETHING WRONG IS HAPPENING!')
  }
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.selector_container {
  background-color: var(--main-text-color);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}
.button_container {
  /* width: 100%; */
  display: flex;
  align-items: stretch;
  /* justify-content: flex-end; */
  /* flex-wrap: nowrap; */
  flex-wrap: wrap;
  gap: 6px;
}
.no_wrap {
  display: flex;
  flex-wrap: nowrap;
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
.popup_menuAdd_container {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  /* width: 100vw; */
  /* height: 100vh; */
  width: 0px;
  height: 0px;
  /* display: flex; */
  align-items: flex-start;
  padding-top: 20%;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
  display: none;
}
.popup_menuAdd {
  background-color: var(--accent-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  flex-wrap: wrap;
  /* gap: 15px; */
  padding: 10px;
  margin: 10px;
  transition: all 0.3s ease-in-out;
}
.popup_menuAdd > label {
  color: var(--main-bg-color);
}
.popup_menuAdd > input {
  width: 100%;
  color: var(--main-text-color);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 12px;
}
.popup_menuAdd > textarea {
  margin-bottom: 12px;
}
.popup_menuAdd > .btn {
  width: 100%;
  height: auto;
  color: var(--main-bg-color);
}
textarea {
  resize: none;
  width: 100%;
  height: 60px;
  color: var(--main-text-color);
  padding: 10px;
  border-radius: 12px;
}
.plus_sign {
  font-size: 45px;
}
@media (max-width: 410px) {
  .emoji {
    font-size: 25px;
  }
  .btn {
    font-size: 14px;
  }
  .plus_sign {
  font-size: 35px;
}
}
</style>

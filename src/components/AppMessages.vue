<script>
import { store } from '@/storage';

export default {
  name: 'AppMessages',
  computed: {
    messages() {
      return store.state.messages
    }
  },
  methods: {
    closeMessage() {
      store.deleteMessage();
    }
  },
}
</script>

<template>
  <div v-for="(messages, index) in messages" :key="index">
    <div :class="messages.type === 'success' ? 'alert-success' : 'alert-error'">
      <p class="pclass">{{ messages.message }}</p>
      <button type="button" class="btn-close" style="margin-left: auto;" @click="closeMessage">x</button>
    </div>
  </div>
</template>

<style scoped>
.pclass {
  margin: 0; 
  flex-grow: 1;
}
.alert-success, .alert-danger {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

.alert-success {
  background-color: green;
  color: white;
}

.alert-danger {
  background-color: red;
  color: white;
}
</style>
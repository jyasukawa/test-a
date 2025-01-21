<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const cards = ['Today'];
const Messages = reactive([]);
const user_id = ref('');
const messageInput = ref('');
const route = useRoute();

const handleSubmit = () => {
	if (messageInput.value.trim() !== '') {
    Messages.unshift({ message: messageInput.value });
    messageInput.value = '';
  }
};

const handleReset = () => {
  messageInput.value = '';
};

onMounted(async () => {
  try {
    user_id.value = route.query.user_id || 'unknown';
    const chatRef = collection(db, "chats");
    const snapShot = await getDocs(chatRef);
    snapShot.forEach((doc) => {
      Messages.push(doc.data());
    });
  } catch (error) {
    console.error("Firestoreのデータ取得に失敗しました:", error);
  }
});
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{ card }}</v-list-subheader>

                <template v-for="(item, index) in Messages" :key="index">
                  <v-list-item>
                    <template #prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>

                    <v-list-item-title class="message">{{ item.message }}</v-list-item-title>
                  </v-list-item>

                  <v-divider v-if="index !== Messages.length - 1" :key="`divider-${index}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
			<p>{{ Messages }}</p>
      <v-container class="input-container">
        <v-row>
          <v-col cols="12" sm="6">
            <v-textarea
              v-model="messageInput"
              append-icon="mdi-comment"
              class="mx-2"
              label="メッセージを送信する"
              rows="1"
              auto-grow
            ></v-textarea>
            <v-btn @click="handleSubmit" class="me-4" type="submit">送信</v-btn>

            <v-btn @click="handleReset">クリア</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.message {
	text-align: left;
}

.input-container {
	margin: 0;
}
</style>
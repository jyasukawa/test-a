<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const cards = ['Today'];
const Messages = reactive([]);
const user_id = ref('');
const messageInput = ref('');
const route = useRoute();

const handleSubmit = async () => {
  if (messageInput.value.trim() !== '') {
    const newMessage = { 
      message: messageInput.value, 
      timestamp: new Date(), 
      user_id: user_id.value 
    };

    try {
      const docRef = await addDoc(collection(db, "chats"), newMessage);
      Messages.unshift({ ...newMessage, id: docRef.id }); // idを含める
      messageInput.value = '';
    } catch (error) {
      console.error("Firestoreへのメッセージ保存に失敗しました:", error);
    }
  }
};

const handleDelete = async (id) => {
  try {
    // Firestoreから該当メッセージを削除
    await deleteDoc(doc(db, "chats", id));

    // ローカルのメッセージリストから削除
    const index = Messages.findIndex((msg) => msg.id === id);
    if (index !== -1) {
      Messages.splice(index, 1);
    }
  } catch (error) {
    console.error("Firestoreからのメッセージ削除に失敗しました:", error);
  }
};

const handleEdit = (item) => {
  // 編集モードに切り替え & 現在のメッセージを保存
  item.originalMessage = item.message; 
  item.isEditing = true;
};

const handleSave = async (item) => {
  try {
    const messageDoc = doc(db, "chats", item.id);
    await updateDoc(messageDoc, { message: item.message });

    item.isEditing = false; // 編集モードを解除
    delete item.originalMessage; // 保存後にoriginalMessageを削除
  } catch (error) {
    console.error("Firestoreのメッセージ更新に失敗しました:", error);
  }
};

const handleCancelEdit = (item) => {
  // 元のメッセージを復元し、編集モードを解除
  item.message = item.originalMessage;
  delete item.originalMessage;
  item.isEditing = false;
};

const handleReset = () => {
  messageInput.value = '';
};

onMounted(async () => {
  try {
    user_id.value = route.query.user_id || 'unknown';
    const chatRef = collection(db, "chats");

    // timestampで降順にソート
    const chatQuery = query(chatRef, orderBy("timestamp", "desc"));
    const snapShot = await getDocs(chatQuery);
    snapShot.forEach((doc) => {
      Messages.push({ ...doc.data(), id: doc.id }); // doc.idを含める
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
                    <div class="mcon">
                      <!-- 編集モードかどうかを判定 -->
                      <div v-if="item.isEditing">
                        <v-textarea
                          v-model="item.message"
                          label="メッセージを編集"
                          rows="1"
                          auto-grow
                        ></v-textarea>
                        <v-btn @click="handleSave(item)" color="success" small>保存</v-btn>
                        <v-btn @click="handleCancelEdit(item)" color="error" small>キャンセル</v-btn>
                      </div>
                      <div v-else>
                        <v-list-item-title class="message">{{ item.message }}</v-list-item-title>
                        <v-btn @click="handleEdit(item)" icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="handleDelete(item.id)" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-list-item>

                  <v-divider v-if="index !== Messages.length - 1" :key="`divider-${index}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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

.mcon {
  display: flex;
}

.input-container {
	margin: 0;
}
</style>
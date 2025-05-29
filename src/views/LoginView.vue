<script lang="ts" setup>
// import { ref } from "vue";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase/firebase"; // Firebase設定ファイルを適切に設定

// // ステートの定義
// const email = ref<string>("");
// const password = ref<string>("");
// const errorMessage = ref<string>("");

// // ログイン処理
// const handleLogin = async (): Promise<void> => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
//     alert(`ログイン成功: ${userCredential.user.email}`);
//   } catch (error: any) {
//     errorMessage.value = error.message || "ログインに失敗しました";
//   }
// };
</script>

<template>
  <p>aaa</p>
  <!-- <div class="login-form">
    <h1>ログイン</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
  </div> -->
</template>

<style scoped>
/* .login-form {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.error {
  color: red;
  margin-top: 1em;
  font-weight: bold;
} */
</style>

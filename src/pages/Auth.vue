<template>
  <form @submit.prevent="onLogin">
    <legend>Sign in</legend>
    <div>
      <label for="login">Login</label>
      <input id="login" type="text" v-model="name" />
      <label for="pass">Password</label>
      <input id="pass" type="password" v-model="password" />
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
import { useAuthStore } from "../store/auth";

export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      const authStore = useAuthStore();
      await authStore.login({
        login: this.name,
        password: this.password,
      }).then(() => {
        this.$router.push("/main");
      });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 2rem auto;
  max-width: 30rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  border-radius: 12px;
  padding: 1rem;
}

div {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  row-gap: 0.5rem;
  margin: 1rem 0;
}

button {
  background-color: #026aa7;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  text-transform: uppercase;
  color: #fff;
  padding: 0.5rem 2rem;
}

legend {
  font-weight: bold;
  font-size: 2rem;
}
</style>

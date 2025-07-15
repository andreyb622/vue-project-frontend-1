<template>
  <header>
    <nav>
      <ul>
        <li v-if="isAuth">
          <router-link to="/boards">Boards</router-link>
        </li>
        <li v-if="isAuth">
          <router-link to="/profile">Profile</router-link>
        </li>
      </ul>
      <ul>
        <li v-if="isAuth">
          <a @click="logoutUser">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from "../../store/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    isAuth() {
      return this.authStore.isAuth;
    },
  },
  methods: {
    logoutUser() {
      this.authStore.logout();
      this.$router.push("/auth");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: #026aa7;
}

nav {
  height: 100%;
  display: flex;
  justify-content: space-around;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.1rem;
}

a {
  text-decoration: none;
  font: inherit;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.router-link-active {
  border-radius: 3px;
  color: #fff;
  background-color: hsla(0%, 0%, 100%, 0.3);
}
</style>

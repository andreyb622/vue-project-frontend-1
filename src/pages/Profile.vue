<template>
  <div class="wrapper">
    <div class="user_info">
      <div class="user_avatar">аватар</div>
      <div class="user_name">имя</div>
    </div>
    <div class="settings">
      изменить пароль
    </div>
  </div>
</template>

<script>
export default {
  // Component doesn't seem to use any store data currently
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  min-height: 89vh;
}

.user_avatar {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 10rem;
  height: 10rem;
}
</style>

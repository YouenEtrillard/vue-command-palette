<script setup lang="ts"></script>

<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/commands">Commands</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar-list {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.navbar-list li {
  list-style: none;
  padding: 10px;
}
</style>

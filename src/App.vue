<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

body {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  display: none;
}
</style>

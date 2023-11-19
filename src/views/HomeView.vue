<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
// import { Button } from 'ant-design-vue';
</script>

<template>
  <main>
    <TheWelcome />
    <a-radio :checked="true">Radio</a-radio><a-radio :checked="true">Radio</a-radio><a-radio :checked="true">Radio</a-radio>
    <a-space wrap>
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="text">Text Button</a-button>
      <a-button type="link">Link Button</a-button>
    </a-space>

  </main>
</template>

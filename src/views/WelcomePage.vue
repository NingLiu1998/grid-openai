<template>
    <div>
      <a-result
        status="404"
        :style="{
          height: '100%',
          background: '#fff',
        }"
        title="Hello World  WWWW"
        sub-title="Sorry, you are not authorized to access this page."
      >
        <template #extra>
          <a-button type="primary" @click="handleClick">Back Home</a-button>
        </template>
      </a-result>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { message } from 'ant-design-vue';
  
  const handleClick = () => {
    console.log('info');
    message.info('BackHome button clicked!');
  };
  </script>
  
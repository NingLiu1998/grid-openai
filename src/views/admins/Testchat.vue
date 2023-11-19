<template>
  <div class="test">
    <h1>Chat</h1>

    <div class="upload">
      <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
        :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
        @change="handleChange">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
  </div>
</template>
  

<script lang="ts" setup>
import { http } from "@/service/http";
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';


function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.

    if (info.file.originFileObj != null) {
      getBase64(info.file.originFileObj, (base64Url: string) => {
        imageUrl.value = base64Url;
        loading.value = false;
      });
    }
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

//////@ts-ignore


const beforeUpload = (file: UploadProps['fileList'][number]) => {
  if (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  return false;

};


export type ReqChatModel = { content: string, cid: number };


//初始化的时候发起请求
onMounted(() => {
  console.log(`the component is now mounted.`)


})

// let s = http<ReqChatModel, any>({
//     method: 'GET',
//     url: `/Player/GetPlayerWareHouse`,
//     params: {
//       cid: 1,
//       content: "hello"
//     }
//   })


</script>
<template>
    <a-list v-if="comments.length" :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`" item-layout="horizontal">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-comment :author="item.author" :avatar="item.avatar" :datetime="item.datetime">

                    <template #content>
                        <a-form-item>
                            <MarkdownIt :options="markdownOptions" :source="item.content" />
                        </a-form-item>
                        <a-spin />
                    </template>

                </a-comment>
            </a-list-item>
        </template>
    </a-list>
    <a-comment>
        <template #avatar>
            <a-avatar src="https://cdn.jsdelivr.net/gh/wuxin0011/web-cdn-resource@main/image/logo.png" alt="Han Solo" />
        </template>
        <template #content>

            <div class="input">
                <a-form-item>
                    <a-textarea v-model:value="value" :rows="4" />
                </a-form-item>
                <a-form-item>
                    <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                        发送
                    </a-button>
                </a-form-item>
            </div>
        </template>
    </a-comment>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MarkdownIt from 'vue3-markdown-it'

import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

dayjs.extend(relativeTime);
dayjs.locale('zh-cn')

type Comment = Record<string, string>;

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>('');
const markdownOptions = {
    html: true, // 启用 HTML 标签解析
    linkify: true, // 将 URL 自动转换为链接
    typographer: true // 启用智能标点符号替换
}
const handleSubmit = () => {
    if (!value.value) {
        return;
    }

    submitting.value = true;

    let blockTex = {
        author: 'Me',
        avatar: 'https://cdn.jsdelivr.net/gh/wuxin0011/web-cdn-resource@main/image/logo.png',
        content: value.value,
        datetime: dayjs(`${new Date()}`).format('YYYY年MM月DD日'),
        isloding: "1"
    };

    comments.value.push(blockTex);

    let blockTexIndex = comments.value.length - 1; // 获取最后一个元素的索引

    for (let index = 0; index < 10; index++) {
        setTimeout(() => {
            comments.value[blockTexIndex].content = comments.value[blockTexIndex].content.concat(index.toString());
        }, 800 * (index + 1));
    }

    value.value = ''
    submitting.value = false;


    // setTimeout(() => {
    //     submitting.value = false;
    //     comments.value = [
    //         {
    //             author: 'Me',
    //             avatar: 'https://cdn.jsdelivr.net/gh/wuxin0011/web-cdn-resource@main/image/logo.png',
    //             content: value.value +"old",
    //             datetime: dayjs(`${new Date()}`).format('YYYY年MM月DD日') //dayjs().toNow() //dayjs().fromNow(),
    //         },
    //         ...comments.value,
    //     ];
    //     value.value = '';
    // }, 1000);
};
</script>

<style>
pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
    border-radius: 15px;
    margin: 10px;
}
</style>
  
  
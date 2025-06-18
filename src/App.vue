<script setup lang="ts">
import { ref } from "vue";
import Search from "@/components/Search.vue";

const availableLetters = ref<string>("");
</script>

<template>
    <div class="app-layout">
        <h2>
            Letter Jam Solver, made by
            <a
                href="https://github.com/CalvinLe360/letter-jam-solver"
                target="_blank"
                >Calvin Le</a
            >
        </h2>
        <a
            href="https://boardgamegeek.com/boardgame/275467/letter-jam"
            target="_blank"
        >
            <img class="logo" src="/logo.jpg" />
        </a>
        <input type="text" v-model="availableLetters" v-on:blur="() => {}" />
        <Search :letters="availableLetters" />
    </div>
</template>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
}

.logo {
    will-change: filter;
    transition: filter 300ms;
    margin-bottom: 0.5em;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

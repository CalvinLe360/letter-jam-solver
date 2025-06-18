<script setup lang="ts">
import { computed, ref } from "vue";
import { useDictionary } from "@/stores";
import { Trie } from "@/structures";
import type { CompareFunction } from "./types";

const props = defineProps<{
    letters: string;
}>();

const dictionary = useDictionary();
const selectedCompareFunction = ref<number>(0);
const reverseCompareFunction = ref<boolean>(false);

const compareFunctions: CompareFunction[] = [
    {
        name: "Length",
        fn: (a: string, b: string) => a.length - b.length,
    },
    {
        name: "Name",
        fn: (a: string, b: string) => a.localeCompare(b),
    },
];

const allWords = computed(() => {
    const foundWords: string[] = [];
    const letters = new Set(props.letters);

    function dfs(currentLetters: string[], trieNode: Trie) {
        if (trieNode.endingOfWord && currentLetters.length > 0) {
            foundWords.push(currentLetters.join(""));
        }
        for (const letter of letters) {
            if (trieNode.nodes[letter]) {
                currentLetters.push(letter);
                dfs(currentLetters, trieNode.nodes[letter]);
                currentLetters.pop();
            }
        }
    }
    dfs([], dictionary.words);

    foundWords.sort(
        (a, b) =>
            (reverseCompareFunction.value ? -1 : 1) *
            compareFunctions[selectedCompareFunction.value].fn(a, b)
    );

    return foundWords;
});
</script>

<template>
    <h3>Sort Functions</h3>
    <div class="sort-functions">
        <button
            v-for="(fn, index) in compareFunctions"
            class="sort-functions__button"
            :class="[
                index == selectedCompareFunction &&
                    'sort-functions__button--active',
            ]"
            v-on:click="() => (selectedCompareFunction = index)"
        >
            {{ fn.name }}
        </button>
    </div>
    <button
        v-on:click="() => (reverseCompareFunction = !reverseCompareFunction)"
        :class="[reverseCompareFunction && 'sort-functions__button--active']"
    >
        🔄 Reverse Comparison
    </button>
    <h3>Results</h3>

    <div class="search-results">
        <div v-if="allWords.length == 0">No words found!</div>
        <div v-for="word in allWords">
            {{ word }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.sort-functions {
    display: flex;
    flex-direction: row;
    justify-content: center;

    &__button {
        &--active {
            background-color: blue;
        }
    }
}

.search-results {
    height: 45vh;
    overflow-y: scroll;
}
</style>

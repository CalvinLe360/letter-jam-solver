import { defineStore } from "pinia";
import { ref } from "vue";
import { Trie } from "@/structures";

export const useDictionary = defineStore('dictionary', () => {
    const words = ref<Trie>(new Trie())

    function wordListLink(letter: string) {
        return `https://raw.githubusercontent.com/kloge/The-English-Open-Word-List/refs/heads/master/EOWL%20LF%20Delimited%20Format/${letter}%20Words.txt`
    }

    async function fetchWords(url: string) {
        const response = await fetch(url)
        if (!response.ok) return

        const wordList = (await response.text()).split('\n')
        wordList.forEach(word => {
            words.value.addWord(word, 0)
        })
    }

    for (let i = 0; i < 26; i++) {
        fetchWords(wordListLink(String.fromCharCode(i + ('A'.codePointAt(0) ?? 0))))
    }

    return { words }
})
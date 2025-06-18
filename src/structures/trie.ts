export class Trie {
    endingOfWord = false
    nodes: Record<string, Trie> = {}

    addWord = (word: string, currentIndex: number) => {
        if (currentIndex == word.length) {
            this.endingOfWord = true
            return
        }

        const currentLetter = word[currentIndex].toLocaleLowerCase()
        if (!this.nodes[currentLetter]) {
            this.nodes[currentLetter] = new Trie()
        }

        this.nodes[currentLetter].addWord(word, currentIndex + 1)
    }
}
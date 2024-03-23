

module.exports = {
    async llm_get_decks(req, res) {
        const text_input = req.params.text_input
        const cards = []
        cards.push({
            question: "Does this work?",
            answer: "Yes, so replace this with the generated answers soon!"

        })
        res.json(cards)
    }
}
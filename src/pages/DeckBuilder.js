import { useState } from 'react';

import { LookupCard } from './LookupCard';
import { Card } from '../components/card';
import { getCardByAxios } from '../lib/api';

export function DeckBuilder() {
    const [deckData, setDeckData] = useState('{ "deckName": "My Deck", "cards": [] }');

    const [cardList, setCardList] = useState(
        Array.from({ length: 40 }, (_, i) => (
                <div className="deck__card" key={i}>
                    Card {i + 1}
                </div>
            )));

    const [card, setCard] = useState(null);
    const [id, setId] = useState('130550');
    const [quantity, setQuantity] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    function copyDeckData() {
        // Copy the Deck Data text field to Clipboard
        var copyText = document.getElementById("deckData");

        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(copyText.value);

        alert("Copied the text: " + copyText.value);
    }

    async function overwriteDeckData() {
        updateCardList(await JSON.parse(deckData));
    }

    async function addCardToDeck() {
        const deck = JSON.parse(deckData);
        const currentCards = deck.cards || [];
        const newCardData = card?.data.card;
        const newCard = { 
            "imageUrl": newCardData.imageUrl, 
            "name": newCardData.name, 
            "quantity": quantity
        };
        const updatedCards = [...currentCards, newCard];
        const updatedDeck = { ...deck, cards: updatedCards };
        setDeckData(JSON.stringify(updatedDeck, null, 2));
        updateCardList(updatedDeck)
    }

    function updateCardList(updatedDeck) {
        const deck = updatedDeck;
        console.log('Deck data:', deck);
        const newCardList = Array.from({ length: 40 }, (_, i) => {
                const listCard = deck.cards[i];
                if (listCard) {
                    console.log('Rendering card:', listCard);
                    return (
                        <div className="deck__card" key={i}>
                            <img style={{ width: '100%' }} src={listCard.imageUrl} alt={listCard.name} />
                            <p>{listCard.name}</p>
                        </div>
                    );
                }
                return (
                    <div className="deck__card" key={i}>
                        Card {i + 1}
                    </div>
                );
            });
            
        setCardList(newCardList);
    }

    return (
        <div>
            <h2>Deck Builder</h2>
            <p>This is the Deck Builder page.</p>
            <form className="deck-builder-form">
                <p>Whole Deck Data:</p>
                <label htmlFor="deckData">Deck Data:</label>
                <textarea value={deckData} onChange={(e) => setDeckData(e.target.value)} id="deckData" name="deckData" />
                <div>
                    <button type="button" onClick={overwriteDeckData}>
                        Overwrite Deck Data
                    </button>
                    <button type="button" onClick={copyDeckData}>
                        Copy Deck Data
                    </button>
                </div>
                
            </form>

            <p>Card List:</p>
            <div className="deck">
                <div className="deck__list">
                    {cardList}
                </div>
            </div>

            <p>Add Card by Id:</p>
            <form>
                    <input value={id} onChange={(e) => setId(e.target.value)}></input>
                    <button type="button" onClick={async () => {
                        setIsLoading(true); 
                        setCard(await getCardByAxios(id))
                        setIsLoading(false);
                        }}>Axios</button>
                    {card && !isLoading && (<>
                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Enter Quantity" />
                            <button type="button" onClick={addCardToDeck}>
                            Add Card
                        </button>
                     </>)}
                </form>
                {isLoading && <p>Loading...</p>}
                {/* <button onClick={() => setCard(getCardById('card-id'))}>Id</button>
                <button onClick={() => setCard(getCardByName('card-name'))}>Name</button> */}
                {card && !isLoading && <Card result={card} />}
        </div>
    );
}
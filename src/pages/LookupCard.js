import { Card } from '../components/card';
import { getCardByAxios } from '../lib/api';
import { useState } from 'react';

export function LookupCard() {
    const [card, setCard] = useState(null);
    const [id, setId] = useState('130550');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <h2>Lookup Card by Id with Axios</h2>
            <form>
                <input value={id} onChange={(e) => setId(e.target.value)}></input>
                <button type="button" onClick={async () => {
                    setIsLoading(true); 
                    setCard(await getCardByAxios(id))
                    setIsLoading(false);
                    }}>Axios</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {/* <button onClick={() => setCard(getCardById('card-id'))}>Id</button>
            <button onClick={() => setCard(getCardByName('card-name'))}>Name</button> */}
            {card && <Card result={card} />}
        </div>
    );
};
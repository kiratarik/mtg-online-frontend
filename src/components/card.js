function imageCard({card}) {
  return <img src={card.imageUrl} alt={card.name} />;
}

function textCard({card}) {
  const manaCost = card.manaCost.split('{').slice(1).map((cost, index) => {
    const color = cost.slice(0, -1);
    return (
      <span key={index} className="card__mana-symbol" color={color}>
        {color}
      </span>
    );
  });
  return (
    <>
        <p className="card__name-manacost">
          <span>{card.name}</span>
          <span className="card__manacost">{manaCost}</span>
        </p>
        <p className="card__type-rarity">
          <span>{card.type}</span>
          <span className="card__rarity" rarity={card.rarity}>{card.setName}</span>
        </p>
        <p>{card.text}</p>
        {card.flavor && <p className="card__flavor">{card.flavor}</p>}
        {(card.power || card.toughness) && (
          <p className="card__power-toughness">{card.power || '-'} / {card.toughness || '-'}</p>
        )}
        <p>Number: {card.number}</p>
        <p>Id: {card.multiverseid}</p>
    </>
  );
}

export function Card({ result }) {
    console.log('Card component received result:', result);
  const card = result?.data?.card
  if (!card) {
    return <p>No card selected</p>;
  }
  const dataString = JSON.stringify(card, null, 2);
  return (
    <>
      <div className="card" data={dataString}>
        {textCard({ card })}
      </div>
      <div className="card card__image" data={dataString}>
        {imageCard({ card })}
      </div>
    </>
  );
}
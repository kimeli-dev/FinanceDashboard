import { type Card } from "@shared/schema";

interface CardBalanceProps {
  card?: Card;
}

const CardBalance = ({ card }: CardBalanceProps) => {
  if (!card) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl text-white p-5 shadow-md col-span-1 md:col-span-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-opacity-80 text-sm">Main Card Balance</p>
          <h3 className="text-2xl font-bold mt-1">${card.balance}</h3>
          <p className="text-white text-opacity-80 text-sm mt-1">{card.cardNumber}</p>
        </div>
        <div className="text-right">
          <div className="rounded-full bg-white bg-opacity-20 p-2">
            <i className="fas fa-credit-card"></i>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-white text-opacity-80 text-xs">VALID THRU</p>
          <p className="text-sm font-medium">{card.expiryDate}</p>
        </div>
        <div>
          <p className="text-white text-opacity-80 text-xs">CARD HOLDER</p>
          <p className="text-sm font-medium">{card.cardHolder}</p>
        </div>
        <div>
          <i className={`fab fa-cc-${card.cardType.toLowerCase()} text-2xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default CardBalance;

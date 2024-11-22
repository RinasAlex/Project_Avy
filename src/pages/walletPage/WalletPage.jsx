import React from "react";
import './WalletPage.css';
import CustomButton from "../../ui/customButton/CustomButton";


const WalletPage = ({ transactions }) => {

    return (
        <div className="wallet">
            <h1>Wallet</h1>
            <div className="wallet_balance">
                <span>Balance:</span>
                <strong> 500 coins</strong>
            </div>

            <div className="wallet_button">
                <CustomButton text={"Top Up"} />
                <CustomButton text={"Spend"} />
                <CustomButton text={"Transfer"} />
            </div>

            <div className="wallet_transaction-history">
                <h2>Transaction History</h2>
                <ul>
                    <li>
                        <span>22 Nov 2024</span>
                        <span>Purchased Item</span>
                        <span>-50 coins</span>
                    </li>
                    <li>
                        <span>21 Nov 2024</span>
                        <span>Bonus Received</span>
                        <span>+100 coins</span>
                    </li>
                </ul>
                
                {/* {transactions.length === 0 ? (
                        <p>Нет транзакций</p>
                    ) : (
                        <ul>
                            {transactions.map((tx) => (
                                <li key={tx.id} className={`transaction ${tx.type}`}>
                                    <span>{tx.date}</span>
                                    <span>{tx.description}</span>
                                    <span>{tx.amount} коинов</span>
                                </li>
                            ))}
                        </ul>
                    )} */}
            </div>

            <div className="wallet_promotions">
                <h2>Promotions and Bonuses</h2>
                <div className="promo-list">
                    <div className="promo-card">
                        <h3>Invite a Friend</h3>
                        <p>Get 500 coins for inviting a friend!</p>
                        <button>Get Started</button>
                    </div>
                    <div className="promo-card">
                        <h3>Special Offer</h3>
                        <p>Earn double coins on your next purchase!</p>
                        <button>Claim Now</button>
                    </div>
                </div>
                {/* <CustomButton text={"Invite a friend"} />
                <div className="promo-list">
                    <p>Get 500 coins for inviting a friend!</p>
                </div> */}
            </div>
        </div>
    );
}

export default WalletPage
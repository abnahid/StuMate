import ThemeContext from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import { FaCreditCard, FaPlus, FaRegTrashAlt } from 'react-icons/fa';

const BillingSettings = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            type: 'VISA',
            name: 'USUJAMIN HEBREKA',
            company: 'Business, Inc. 2013',
            number: '•••• •••• •••• 2538',
            expiry: '02/2028',
            cvv: '•••'
        }
    ]);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [newCard, setNewCard] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
        type: 'VISA'
    });
    const { isDarkMode } = useContext(ThemeContext);

    const handleAddCard = () => {
        if (newCard.name && newCard.number && newCard.expiry && newCard.cvv) {
            setCards([...cards, {
                id: cards.length + 1,
                type: newCard.type,
                name: newCard.name,
                company: 'Business, Inc.',
                number: `•••• •••• •••• ${newCard.number.slice(-4)}`,
                expiry: newCard.expiry,
                cvv: '•••'
            }]);
            setNewCard({ name: '', number: '', expiry: '', cvv: '', type: 'VISA' });
            setShowAddCardForm(false);
        }
    };

    const handleDeleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    // Dark mode classes
    const darkModeClasses = {
        bg: isDarkMode ? '' : 'bg-white',
        text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        textTertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        cardBg: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
        inputBg: isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300',
        hoverBg: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
        tableRow: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
        buttonSecondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
    };

    return (
        <div className={`space-y-8 max-w-4xl mx-auto p-4 ${darkModeClasses.bg} ${darkModeClasses.text}`}>
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            {/* Access Details */}
            <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${darkModeClasses.text}`}>Access Details</h2>
                <div className="flex justify-between items-center">
                    <span className={darkModeClasses.textSecondary}>Use Management</span>
                    <span className="font-semibold text-blue-400">Status</span>
                </div>
            </div>

            {/* Status Period */}
            <div className="space-y-2">
                <h3 className={`font-medium ${darkModeClasses.text}`}>Status Period</h3>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-400">MONTHLY</span>
                    <span className={darkModeClasses.textSecondary}>Most recent: 31 Sep. 2021</span>
                </div>
            </div>

            <hr className={`my-4 ${darkModeClasses.border}`} />

            {/* Current Status */}
            <div className="space-y-4">
                <h3 className={`font-medium ${darkModeClasses.text}`}>Current Status (a) No.</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className={`border-b ${darkModeClasses.border}`}>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Name</th>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Status Address</th>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Company Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={darkModeClasses.tableRow}>
                                <td className="py-2"></td>
                                <td className={`py-2 ${darkModeClasses.textSecondary}`}>27254 Hounds Street Chavliets, NC 22002</td>
                                <td className={`py-2 ${darkModeClasses.textSecondary}`}>HouseWebsite</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr className={`my-4 ${darkModeClasses.border}`} />

            {/* Payment Methods Section */}
            <div className="space-y-6">
                <h3 className={`font-medium ${darkModeClasses.text}`}>Payment Methods</h3>

                {/* Existing Cards */}
                <div className="space-y-4">
                    {cards.map(card => (
                        <div key={card.id} className={`border rounded-lg p-4 relative ${darkModeClasses.cardBg} ${darkModeClasses.border}`}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-3">
                                    <FaCreditCard className="text-blue-500 text-xl" />
                                    <div>
                                        <p className="font-semibold">{card.type}</p>
                                        <p className={`text-sm ${darkModeClasses.textSecondary}`}>{card.name}</p>
                                        <p className={`text-xs ${darkModeClasses.textTertiary}`}>{card.company}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteCard(card.id)}
                                    className={`text-gray-400 hover:text-red-500`}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <p className={`text-xs ${darkModeClasses.textTertiary}`}>Card Number</p>
                                    <p className="font-medium">{card.number}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${darkModeClasses.textTertiary}`}>Expiry</p>
                                    <p className="font-medium">{card.expiry}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${darkModeClasses.textTertiary}`}>CVV</p>
                                    <p className="font-medium">{card.cvv}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Card Button */}
                {!showAddCardForm && (
                    <button
                        onClick={() => setShowAddCardForm(true)}
                        className={`flex items-center space-x-2 text-blue-500 hover:text-blue-700`}
                    >
                        <FaPlus />
                        <span>Add another payment method</span>
                    </button>
                )}

                {/* Add New Card Form */}
                {showAddCardForm && (
                    <div className={`border rounded-lg p-4 space-y-4 ${darkModeClasses.cardBg} ${darkModeClasses.border}`}>
                        <h4 className={`font-medium ${darkModeClasses.text}`}>Add New Card</h4>
                        <div className="space-y-3">
                            <div>
                                <label className={`block text-sm ${darkModeClasses.textSecondary} mb-1`}>Cardholder Name</label>
                                <input
                                    type="text"
                                    value={newCard.name}
                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                    className={`w-full p-2 border rounded ${darkModeClasses.inputBg}`}
                                    placeholder="Full name on card"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm ${darkModeClasses.textSecondary} mb-1`}>Card Number</label>
                                <input
                                    type="text"
                                    value={newCard.number}
                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                    className={`w-full p-2 border rounded ${darkModeClasses.inputBg}`}
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm ${darkModeClasses.textSecondary} mb-1`}>Expiry Date</label>
                                    <input
                                        type="text"
                                        value={newCard.expiry}
                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                        className={`w-full p-2 border rounded ${darkModeClasses.inputBg}`}
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm ${darkModeClasses.textSecondary} mb-1`}>CVV</label>
                                    <input
                                        type="text"
                                        value={newCard.cvv}
                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                        className={`w-full p-2 border rounded ${darkModeClasses.inputBg}`}
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={`block text-sm ${darkModeClasses.textSecondary} mb-1`}>Card Type</label>
                                <select
                                    value={newCard.type}
                                    onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                                    className={`w-full p-2 border rounded ${darkModeClasses.inputBg}`}
                                >
                                    <option value="VISA">VISA</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="American Express">American Express</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-2">
                            <button
                                onClick={() => setShowAddCardForm(false)}
                                className={`px-4 py-2 border rounded ${darkModeClasses.text} ${darkModeClasses.border} ${darkModeClasses.hoverBg}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCard}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save Card
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <hr className={`my-4 ${darkModeClasses.border}`} />

            {/* Email Address */}
            <div className="space-y-2">
                <span className="font-semibold">Email Address</span>
                <div>
                    <span className="font-semibold">Current Address</span>
                    <p className={darkModeClasses.textSecondary}>2724 Hounds Street Chavliets, NC 22002</p>
                </div>
            </div>

            <hr className={`my-4 ${darkModeClasses.border}`} />

            {/* Status History */}
            <div className="space-y-4">
                <h3 className={`font-medium ${darkModeClasses.text}`}>Status History</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className={`border-b ${darkModeClasses.border}`}>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Date</th>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Invités/Inclure</th>
                                <th className={`text-left py-2 ${darkModeClasses.text}`}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className={darkModeClasses.tableRow}>
                                    <td className={`py-2 ${darkModeClasses.textSecondary}`}>25 October 2018</td>
                                    <td className={`py-2 ${darkModeClasses.textSecondary}`}>AT - 8756</td>
                                    <td className={`py-2 ${darkModeClasses.textSecondary}`}>$19.90</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className={`text-sm mt-6 ${darkModeClasses.textTertiary}`}>
                <p>Source: All members</p>
            </div>
        </div>
    );
};

export default BillingSettings;
import ThemeContext from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Plan = () => {
    const [selectedPlan, setSelectedPlan] = useState('professional');
    const { isDarkMode } = useContext(ThemeContext);
    // Assuming you have a way to get the dark mode state from context or props

    // Dark mode classes
    const darkModeClasses = {
        bg: isDarkMode ? '' : 'bg-white',
        text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
        highlightBg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
        button: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
    };

    const plans = [
        {
            id: 'basic',
            title: 'Basic',
            price: '$0 / month',
            description: 'All the basics for starting a new business',
            tag: 'Current Plan',
            features: [
                '30 Metrics',
                '2 Users',
                'Data Feed Integrations',
                'Download PDF Reports'
            ]
        },
        {
            id: 'professional',
            title: 'Professional',
            price: '$69 / month',
            description: 'Everything you need for a growing business',
            tag: 'New Plan',
            features: [
                'Unlimited Metrics',
                '10 Users',
                'Advanced Analyses',
                'Priority Support'
            ]
        },
        {
            id: 'advanced',
            title: 'Advanced',
            price: '$99 / month',
            description: 'Advanced features for scaling your business',
            tag: 'Select Plan',
            features: [
                'Unlimited Metrics',
                '15 Users',
                'Customize Dashboard Style',
                'AI Metrics Features'
            ]
        }
    ];

    return (
        <div className={`min-h-screen p-4 md:p-8  ${darkModeClasses.text}`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Scale collaboration with more users</h1>
                    <p className={`text-lg ${darkModeClasses.textSecondary}`}>1 USER REMAINING</p>
                </div>

                <hr className={`my-6 ${darkModeClasses.border}`} />

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`rounded-lg border p-6 ${darkModeClasses.cardBg} ${darkModeClasses.border} ${selectedPlan === plan.id ? `ring-2 ring-blue-500 ${darkModeClasses.highlightBg}` : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold">{plan.title}</h2>
                                    <p className="text-lg font-semibold my-2">{plan.price}</p>
                                    <p className={darkModeClasses.textSecondary}>{plan.description}</p>
                                </div>
                                {plan.tag && (
                                    <span className={`px-3 py-1 rounded-full text-sm ${plan.id === 'basic' ? 'bg-green-100 text-green-800' :
                                        plan.id === 'professional' ? 'bg-blue-100 text-blue-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                        {plan.tag}
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`w-full py-2 px-4 rounded-md font-medium ${selectedPlan === plan.id ?
                                    `${darkModeClasses.button} text-white` :
                                    `border ${darkModeClasses.border} ${darkModeClasses.text} hover:bg-gray-100 dark:hover:bg-gray-700`
                                    }`}
                            >
                                {plan.id === 'basic' ? 'Current Plan' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>

                <hr className={`my-6 ${darkModeClasses.border}`} />

                {/* First Breakdown Section */}
                <div className="mt-8 mb-8">
                    <h3 className="text-lg font-semibold mb-4">Breakdown</h3>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <p className="font-medium">Professional</p>
                            <p className={darkModeClasses.textSecondary}>Monthly</p>
                        </div>
                        <p className={`text-sm mt-2 md:mt-0 ${darkModeClasses.textSecondary}`}>
                            *All prices in US Dollars - Taxes not included
                        </p>
                    </div>
                </div>

                <hr className={`my-6 ${darkModeClasses.border}`} />

                {/* Second Breakdown Section (New Addition) */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Breakdown</h2>
                    <div className="space-y-2 mb-4">
                        <h3 className="text-lg font-semibold">Professional</h3>
                        <p className={darkModeClasses.textSecondary}>Monthly</p>
                    </div>
                    <p className={`text-sm mb-6 ${darkModeClasses.textSecondary}`}>
                        *All prices in US Dollars • Taxes not included
                    </p>

                    <hr className={`my-4 ${darkModeClasses.border}`} />

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Total = $69</h3>
                        <button className={`px-4 py-2 rounded-md font-medium ${darkModeClasses.button} text-white`}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;


import { RefreshCw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { DAILY_QUOTES } from '../../../../lib/constants';

export function MotivationalCard() {
    const [quote, setQuote] = useState({ title: '', subtitle: '' });

    const getTodaysQuote = () => {
        const dayOfWeek = new Date().getDay();
        return DAILY_QUOTES[dayOfWeek];
    };

    useEffect(() => {
        setQuote(getTodaysQuote());
    }, []);

    const handleRefresh = () => {
        const newQuote = getTodaysQuote();

        if (newQuote.title === quote.title && DAILY_QUOTES.length > 1) {
            const otherQuotes = DAILY_QUOTES.filter(q => q.title !== quote.title);
            setQuote(otherQuotes[Math.floor(Math.random() * otherQuotes.length)]);
        } else {
            setQuote(newQuote);
        }
    };

    return (
        <Card className="h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white relative flex flex-col justify-between p-[20px] gap-5">
            <div className="flex items-center justify-between">
                {/* Left Icon */}
                <Sparkles className="w-6 h-6" />

                {/* Right Side Controls */}
                <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-white">
                        <div className="w-4 h-4 rounded-full bg-[#FCD34D]"></div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-white text-primary hover:bg-white/20 hover:text-white rounded-full"
                        onClick={handleRefresh}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>
            </div>


            <CardContent className="flex flex-col p-0 gap-3">
                <h3 className="text-[20px] font-bold ">{quote.title}</h3>
                <p className="text-sm opacity-80">{quote.subtitle}</p>
            </CardContent>
        </Card>
    );
}

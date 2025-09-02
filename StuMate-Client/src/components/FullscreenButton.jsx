
import { Maximize, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    const handleToggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Button onClick={handleToggleFullscreen} variant="ghost" size="icon" className="bg-sidebar rounded-full">
            {isFullscreen ? <Minimize className="h-10 w-10" /> : <Maximize className="h-10 w-10" />}
            <span className="sr-only">Toggle fullscreen</span>
        </Button>
    );
}

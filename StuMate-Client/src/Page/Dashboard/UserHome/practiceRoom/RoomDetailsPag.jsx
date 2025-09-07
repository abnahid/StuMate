import { Check, Copy, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Skeleton } from '../../../../components/ui/skeleton';
import { usePracticeRoom } from '../../../../hooks/usePracticeRoom';
import { useToast } from '../../../../hooks/useToast';

function RoomDetailsSkeleton() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-4 w-64 mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                    <Skeleton className="h-6 w-32 mx-auto mt-4" />
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
}

export function RoomDetailsPage() {
    const { roomCode } = useParams(); // Ensure you get roomCode from URL
    const trimmedCode = roomCode?.trim(); // Remove any extra spaces
    const { useRoomByCode } = usePracticeRoom();
    const { toast } = useToast();
    const [isCopied, setIsCopied] = useState(false);

    const { data: room, isLoading, error } = useRoomByCode(trimmedCode);

    // Debugging logs
    useEffect(() => {
        console.log('Room Code from URL:', roomCode);
        console.log('Trimmed Room Code:', trimmedCode);
        console.log('Room Data:', room);
        console.log('Loading:', isLoading);
        console.log('Error:', error);
    }, [roomCode, trimmedCode, room, isLoading, error]);

    const handleCopy = () => {
        if (!trimmedCode) return;
        navigator.clipboard.writeText(trimmedCode);
        toast({ title: 'Copied!', description: 'Room code copied to clipboard.' });
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (isLoading) {
        return <RoomDetailsSkeleton />;
    }

    if (!room && !isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-md text-center p-8">
                    <CardTitle className="text-2xl text-destructive">Room Not Found</CardTitle>
                    <CardDescription className="mt-2">
                        The room code is invalid or has expired.
                    </CardDescription>
                    <Button asChild className="mt-6">
                        <Link to="/dashboard/practice-room">Go Back</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-150px)] flex items-center justify-center p-4">
            <img
                src="https://picsum.photos/1200/800"
                alt="Study Background"
                className="absolute inset-0 object-cover w-full h-full -z-10 opacity-20"
            />
            <Card className="w-full max-w-lg text-center ">
                <CardHeader>
                    <Avatar className="h-24 w-24 mx-auto border-4 border-primary">
                        <AvatarImage src={room.hostPhotoURL} />
                        <AvatarFallback>{room.hostName?.[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl pt-4">
                        {room.hostName} is inviting you to a practice session
                    </CardTitle>
                    <CardDescription>
                        Use the code below or join the meeting directly.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4">
                        <p className="text-2xl md:text-3xl font-mono font-bold tracking-widest">{room.code}</p>
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full">
                        <Link to={room.meetLink} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-5 w-5" />
                            Join Now
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

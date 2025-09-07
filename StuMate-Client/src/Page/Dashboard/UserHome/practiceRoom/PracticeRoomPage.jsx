
import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, Loader2, LogIn, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { usePracticeRoom } from '../../../../hooks/usePracticeRoom';
import { useToast } from "../../../../hooks/useToast";

const joinSchema = z.object({
    code: z.string().min(6, "Code must be at least 6 characters.").max(10, "Code cannot be more than 10 characters.")
});

const createSchema = z.object({
    meetLink: z.string().url("Please enter a valid Google Meet URL.")
});

export function PracticeRoomPage() {
    const { createRoom } = usePracticeRoom();
    // const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const joinForm = useForm({
        resolver: zodResolver(joinSchema),
        defaultValues: { code: '' },
    });

    const createForm = useForm({
        resolver: zodResolver(createSchema),
        defaultValues: { meetLink: '' },
    });


    const handleCreateRoom = async (values) => {
        try {
            const newRoom = await createRoom.mutateAsync(values);
            navigate(`/dashboard/practice-room/${newRoom.code}`);
        } catch (error) {
            console.error("❌ Create Room Error:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to create a new room. Please try again.'
            });
        }
    };

    const handleJoinRoom = (values) => {
        navigate(`/dashboard/practice-room/${values.code}`);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md py-0 
            ">
                <Tabs defaultValue="create" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-t-[20px] rounded-b-none p-2 h-12 bg-muted text-muted-foreground">
                        <TabsTrigger value="create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Room
                        </TabsTrigger>
                        <TabsTrigger value="join">
                            <LogIn className="mr-2 h-4 w-4" />
                            Join Room
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="create" className=" p-6">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-semibold">Create a New Room</CardTitle>
                            <CardDescription>Follow these steps to create your practice session.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 mt-6 space-y-6">
                            <div className="space-y-2 text-sm">
                                <p><strong>Step 1:</strong> Click the link below to generate a new Google Meet link.</p>
                                <Button variant="outline" asChild>
                                    <Link to="https://meet.new" target="_blank">
                                        Generate Meet Link <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="space-y-2 text-sm">
                                <p><strong>Step 2:</strong> Paste the link below and create your room.</p>
                                <Form {...createForm}>
                                    <form onSubmit={createForm.handleSubmit(handleCreateRoom)} className="space-y-4">
                                        <FormField
                                            control={createForm.control}
                                            name="meetLink"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Google Meet URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://meet.google.com/xxx-xxxx-xxx" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" disabled={createRoom.isPending}>
                                            {createRoom.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            {createRoom.isPending ? 'Creating Room...' : 'Create Practice Room'}
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="join" className="p-6">
                        <CardHeader className="px-0">
                            <CardTitle className="text-2xl font-semibold">Join an Existing Room</CardTitle>
                            <CardDescription>Enter the code from a friend to join their practice session.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-0 mt-6">
                            <Form {...joinForm}>
                                <form onSubmit={joinForm.handleSubmit(handleJoinRoom)} className="space-y-4">
                                    <FormField
                                        control={joinForm.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Room Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter code..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Join Room</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}

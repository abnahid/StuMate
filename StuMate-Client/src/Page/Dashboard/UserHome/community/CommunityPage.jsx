

import { BookOpen, MessagesSquare, PlusCircle, Rss } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { CategoryView } from './CategoryView';
import { PostForm } from './PostForm';

const categories = [
    { value: 'discussion', label: 'Discussion', icon: MessagesSquare },
    { value: 'announcements', label: 'Announcements', icon: Rss },
    { value: 'resources', label: 'Resources', icon: BookOpen },
]

export function CommunityPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Community Forum</h2>
                <Button onClick={() => setIsFormOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Post
                </Button>
            </div>

            <Tabs defaultValue="discussion" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {categories.map((cat) => (
                        <TabsTrigger key={cat.value} value={cat.value}>
                            <cat.icon className="mr-2 h-4 w-4" />
                            {cat.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map((cat) => (
                    <TabsContent key={cat.value} value={cat.value}>
                        <CategoryView category={cat.value} />
                    </TabsContent>
                ))}
            </Tabs>


            <PostForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
        </div>
    );
}

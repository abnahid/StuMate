

import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Skeleton } from '../../../../components/ui/skeleton';
import { useCommunity } from '../../../../hooks/useCommunity';
import { CommentSection } from './CommentSection';

function PostViewSkeleton() {
    return (
        <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}


export function PostView({ postId }) {
    const { usePost } = useCommunity();
    const { data: post, isLoading } = usePost(postId);

    if (isLoading) return <PostViewSkeleton />;
    if (!post) return <p>Post not found.</p>;

    return (
        <div>
            <Button asChild variant="outline" className="mb-4">
                <Link href="/community">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Community
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{post.title}</CardTitle>
                    <div className="flex items-center gap-3 pt-4 text-sm text-muted-foreground">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={post.authorPhotoURL} />
                            <AvatarFallback>{post.authorName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-foreground">{post.authorName}</p>
                            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="whitespace-pre-wrap text-base">
                    {post.content}
                </CardContent>
            </Card>

            <CommentSection postId={postId} />
        </div>
    );
}



import { Skeleton } from '../../../../components/ui/skeleton';
import { useCommunity } from '../../../../hooks/use-community';
import { PostCard } from './PostCard';

function PostSkeleton() {
    return (
        <div className="p-6 border rounded-lg space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    )
}

export function CategoryView({ category }) {
    const { usePosts } = useCommunity();
    const { data: posts, isLoading } = usePosts(category);

    return (
        <div className="space-y-4 mt-6">
            {isLoading && (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            )}
            {!isLoading && posts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">No posts in this category yet.</h3>
                    <p>Be the first to start a discussion!</p>
                </div>
            )}
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
}



import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../../components/ui/form';
import { Skeleton } from '../../../../components/ui/skeleton';
import { Textarea } from '../../../../components/ui/textarea';
import useAuth from '../../../../hooks/useAuth';
import { useCommunity } from '../../../../hooks/useCommunity';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty.'),
});

function CommentSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export function CommentSection({ postId }) {
  const { useComments, addComment } = useCommunity();
  const { data: comments, isLoading } = useComments(postId);
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' },
  });

  const onSubmit = (values) => {
    if (!user) return;
    addComment.mutate({
      postId,
      ...values,
      authorName: user.displayName,
      authorEmail: user.email,
      authorPhotoURL: user.photoURL,
    });
    form.reset();
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Comments ({comments?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <Avatar className="h-10 w-10 mt-1">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Add a comment..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
          </Form>
        )}
        <div className="space-y-6">
          {isLoading && (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}
          {comments && comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.authorPhotoURL} />
                <AvatarFallback>{comment.authorName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">{comment.authorName}</span>
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
          {!isLoading && comments && comments.length === 0 && (
            <p className="text-center text-muted-foreground pt-4">No comments yet. Be the first to reply!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

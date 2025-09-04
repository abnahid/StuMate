

import { formatDistanceToNow } from 'date-fns';
import { Edit, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import useAuth from '../../../../hooks/useAuth';
import { useCommunity } from '../../../../hooks/useCommunity';
import { PostForm } from './PostForm';


export function PostCard({ post }) {
    const { user } = useAuth();
    const { deletePost } = useCommunity();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // A user is considered an admin for demo purposes if their email matches.
    // In a real app, this role would come from a secure source like a JWT payload.
    const isAdmin = user?.email === 'admin@stumate.com';
    const isOwner = user?.email === post.authorEmail;

    const canEdit = isOwner;
    const canDelete = isOwner || isAdmin;

    return (
        <>
            <Card className="hover:bg-muted/50 transition-colors relative">
                {(canEdit || canDelete) && (
                    <div className="absolute top-4 right-4">
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {canEdit && (
                                        <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Edit</span>
                                        </DropdownMenuItem>
                                    )}
                                    {canDelete && (
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this post and all its comments.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deletePost.mutate({ postId: post._id, authorEmail: user.email })}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
                <Link to={`/dashboard/community/post/${post._id}`} className="block">
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-5">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={post.authorPhotoURL} />
                                <AvatarFallback>{post.authorName?.[0]}</AvatarFallback>
                            </Avatar>
                            <span>{post.authorName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.commentCount || 0}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Link>
            </Card>
            {isOwner && (
                <PostForm
                    isOpen={isEditDialogOpen}
                    setIsOpen={setIsEditDialogOpen}
                    post={post}
                />
            )}
        </>
    );
}


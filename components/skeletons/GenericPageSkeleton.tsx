import React from 'react';
import Container from '../ui/Container';
import Skeleton from '../ui/Skeleton';

const GenericPageSkeleton: React.FC = () => {
    return (
        <div>
            <Skeleton className="h-96 w-full" />
            <Container className="py-16 sm:py-24 max-w-4xl mx-auto">
                <div className="text-center">
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <div className="mt-6 space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6 mx-auto" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12 mt-20 items-center">
                    <div>
                        <Skeleton className="h-8 w-1/2 mb-4" />
                         <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                     <div>
                        <Skeleton className="aspect-square w-full" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default GenericPageSkeleton;

import React, { Suspense } from "react";

export function WithSuspenseHOC<WrappedComponentProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
    return (props: WrappedComponentProps) => {
        return <Suspense fallback={<div>loading...</div>}>
            <WrappedComponent {...props} />
        </Suspense>
    }
}
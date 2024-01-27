import { QueryClient } from "@tanstack/react-query";
import { useUnmount } from "ahooks";
import { useCallback } from "react";

const queryClient = new QueryClient({});

type Todo = string;
type Context = {
    previousTodos: Todo[];
};

export const useClearServerStateCache = (): void => {
    const clearCache = useCallback(() => queryClient.unmount(), []);
    useUnmount(clearCache);
};

const cache = {
    onMutate: async (newTodo: Todo) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["todos"] });

        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData(["todos"]) as Todo[];

        // Optimistically update to the new value
        queryClient.setQueryData(["todos"], (old: Todo) => [...old, newTodo]);

        // Return a context object with the snapshotted value
        return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err: Error, newTodo: Todo, context: Context) => {
        queryClient.setQueryData(["todos"], context.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
};

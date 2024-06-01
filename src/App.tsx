import {
  useRefetchSessionQuery,
  useLazyRefetchSessionQuery,
  useLoginMutation,
} from "./app/services/auth";
import { useAppDispatch, useTypedSelector } from "./app/store";
import { auth } from "./features/auth/auth-slice";

export default function App() {
  const isAuthenticated = useTypedSelector(s => s.auth.isAuthenticated);
  const user = useTypedSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // useInitializeSessionQuery();

  const [get] = useLazyRefetchSessionQuery();
  return (
    <div>
      <button
        onClick={() => {
          login({});
        }}
      >
        {isAuthenticated ? "authenticated" : "not authenticated"}
      </button>{" "}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => {
          dispatch(auth.logout());
        }}
      >
        Logout
      </button>
      <button onClick={() => get()}>get</button>
    </div>
  );
}

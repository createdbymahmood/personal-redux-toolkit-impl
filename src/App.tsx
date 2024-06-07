import { useLoginMutation, useLogoutMutation } from "./app/services/auth";
import { useAppDispatch, useTypedSelector } from "./app/store";

export default function App() {
  const isAuthenticated = useTypedSelector(s => s.auth.isAuthenticated);
  const user = useTypedSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

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
      <button onClick={() => logout()}>Logout</button>
      {/* <button onClick={() => get()}>get</button> */}
    </div>
  );
}

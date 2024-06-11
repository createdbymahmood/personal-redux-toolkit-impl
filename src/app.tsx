import { useLoginMutation } from "./app/services/auth";
import { useTypedSelector } from "./app/store";
import { authSelectors } from "./features/auth/selectors";

export default function App() {
  const [login] = useLoginMutation();

  const [user, isAuthenticated] = useTypedSelector(state => [
    authSelectors.getUser(state),
    authSelectors.getIsAuthenticated(state),
  ]);

  return (
    <div>
      <pre>{JSON.stringify({ user, isAuthenticated }, null, 2)}</pre>
      <button onClick={login}>login</button>
    </div>
  );
}

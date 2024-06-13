import { rest } from "msw";
import { createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { Post } from "../app/services/auth";

// We're just going to use a simple in-memory store for both the counter and posts
// The entity adapter will handle modifications when triggered by the MSW handlers

let count = 0;
let startingId = 3; // Just a silly counter for usage when adding new posts
export const user = {
  first_name: "Test",
  last_name: "User",
  email: "123@gmail.com",
  phone: "123",
};
const adapter = createEntityAdapter<Post>();

let state = adapter.getInitialState();
state = adapter.setAll(state, [
  { id: 1, name: "A sample post", fetched_at: new Date().toUTCString() },
  {
    id: 2,
    name: "A post about rtk-query",
    fetched_at: new Date().toUTCString(),
  },
]);

export { state };

// Just use a random id for an auth token
const token = nanoid();

export const handlers = [
  rest.get("/time/:offset", (req, res, ctx) => {
    const { offset } = req.params as { offset: string };
    const date = new Date();
    const localDate = date.getTime(); // users local time
    const localOffset = date.getTimezoneOffset() * 60000;
    const formattedOffset = Number(offset.replace(":", "."));
    const target = localDate + localOffset + 3600000 * formattedOffset;
    return res(
      ctx.json({ time: new Date(target).toUTCString() }),
      ctx.delay(400)
    );
  }),

  // rest.post("/login", (req, res, ctx) => {
  //   return res.once(ctx.json({ message: "i fail once" }), ctx.status(500));
  // }),
  rest.post("/login", (req, res, ctx) => {
    return res(ctx.json({ token, user }));
  }),

  rest.post("/logout", (req, res, ctx) => {
    return res(ctx.json({ token, user }), ctx.delay(2000));
  }),

  rest.get("/me", (req, res, ctx) => {
    // return res(ctx.json({ token, user }), ctx.delay(4000));
    return res(ctx.status(500), ctx.json({ error: "Salam" }), ctx.delay(1000));
  }),

  // rest.get("/refreshToken", (req, res, ctx) => {
  //   return res.once(
  //     ctx.status(401),
  //     ctx.json({ error: "Salam" }),
  //     ctx.delay(1000)
  //   );
  // }),
  rest.get("/refreshToken", (req, res, ctx) => {
    return res(ctx.json({ token, user }), ctx.delay(4000));
  }),
];

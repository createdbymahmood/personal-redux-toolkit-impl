import { AppDispatch } from "src/app/store";
import { generatedApi } from "src/lib/__generated";
import { providesList } from "src/lib/redux";

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ["ticket"],
  endpoints: {
    createTicket: {},
    assignTicket: {},
    getAllTickets: {},
    getUsers: {
      providesTags: response => {
        return providesList({
          resultsWithIds: response?.map(user => ({ ...user, id: user.email! })),
          tagType: "User",
        });
      },
    },
    patchUsersById: {
      invalidatesTags: (response, error, args) => {
        return [{ type: "User", id: args.id }, { type: "User" }];
      },
    },
  },
});

export const prefetchTickets = (d: AppDispatch) => {
  return d(api.endpoints.getAllTickets.initiate({})).unwrap();
};

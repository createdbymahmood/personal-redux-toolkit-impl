import { baseApi as api } from "../app/services/base-api";
export const addTagTypes = [
  "Users",
  "Admin",
  "User",
  "Wallet",
  "Transaction",
  "admin",
  "customer",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          params: { page: queryArg.page, limit: queryArg.limit },
        }),
      }),
      getUsersById: build.query<GetUsersByIdApiResponse, GetUsersByIdApiArg>({
        query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
      }),
      deleteUsersById: build.mutation<
        DeleteUsersByIdApiResponse,
        DeleteUsersByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/users/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
      patchUsersById: build.mutation<
        PatchUsersByIdApiResponse,
        PatchUsersByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/users/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
      }),
      patchUsersPanel: build.mutation<
        PatchUsersPanelApiResponse,
        PatchUsersPanelApiArg
      >({
        query: (queryArg) => ({
          url: `/users/panel`,
          method: "PATCH",
          body: queryArg.body,
        }),
      }),
      deleteUsersPanel: build.mutation<
        DeleteUsersPanelApiResponse,
        DeleteUsersPanelApiArg
      >({
        query: () => ({ url: `/users/panel`, method: "DELETE" }),
      }),
      putUsersPanelImage: build.mutation<
        PutUsersPanelImageApiResponse,
        PutUsersPanelImageApiArg
      >({
        query: (queryArg) => ({
          url: `/users/panel/image`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
      deleteUsersPanelImage: build.mutation<
        DeleteUsersPanelImageApiResponse,
        DeleteUsersPanelImageApiArg
      >({
        query: () => ({ url: `/users/panel/image`, method: "DELETE" }),
      }),
      postAuthLogin: build.mutation<
        PostAuthLoginApiResponse,
        PostAuthLoginApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/login`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      postAuthSignup: build.mutation<
        PostAuthSignupApiResponse,
        PostAuthSignupApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/signup`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      postAuthUsername: build.mutation<
        PostAuthUsernameApiResponse,
        PostAuthUsernameApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/username`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      updateUserPassword: build.mutation<
        UpdateUserPasswordApiResponse,
        UpdateUserPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/users/panel/password`,
          method: "PATCH",
          body: queryArg.body,
          headers: { Authorization: queryArg.authorization },
        }),
        invalidatesTags: ["Users"],
      }),
      postCatalogCategoryAdmin: build.mutation<
        PostCatalogCategoryAdminApiResponse,
        PostCatalogCategoryAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/category/admin`,
          method: "POST",
          body: queryArg.createCategory,
        }),
        invalidatesTags: ["Admin"],
      }),
      getCatalogCategoryAdmin: build.query<
        GetCatalogCategoryAdminApiResponse,
        GetCatalogCategoryAdminApiArg
      >({
        query: () => ({ url: `/catalog/category/admin` }),
        providesTags: ["Admin"],
      }),
      getCatalogCategoryAdminById: build.query<
        GetCatalogCategoryAdminByIdApiResponse,
        GetCatalogCategoryAdminByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/category/admin/${queryArg.id}`,
        }),
        providesTags: ["Admin"],
      }),
      patchCatalogCategoryAdminById: build.mutation<
        PatchCatalogCategoryAdminByIdApiResponse,
        PatchCatalogCategoryAdminByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/category/admin/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateCategory,
        }),
        invalidatesTags: ["Admin"],
      }),
      deleteCatalogCategoryAdminById: build.mutation<
        DeleteCatalogCategoryAdminByIdApiResponse,
        DeleteCatalogCategoryAdminByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/category/admin/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Admin"],
      }),
      getCatalogCategory: build.query<
        GetCatalogCategoryApiResponse,
        GetCatalogCategoryApiArg
      >({
        query: () => ({ url: `/catalog/category` }),
        providesTags: ["User"],
      }),
      getCatalogCategoryById: build.query<
        GetCatalogCategoryByIdApiResponse,
        GetCatalogCategoryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/catalog/category/${queryArg.id}` }),
        providesTags: ["User"],
      }),
      postCatalogServiceAdmin: build.mutation<
        PostCatalogServiceAdminApiResponse,
        PostCatalogServiceAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/service/admin`,
          method: "POST",
          body: queryArg.createService,
        }),
        invalidatesTags: ["Admin"],
      }),
      getCatalogServiceAdmin: build.query<
        GetCatalogServiceAdminApiResponse,
        GetCatalogServiceAdminApiArg
      >({
        query: () => ({ url: `/catalog/service/admin` }),
        providesTags: ["Admin"],
      }),
      getCatalogServiceAdminById: build.query<
        GetCatalogServiceAdminByIdApiResponse,
        GetCatalogServiceAdminByIdApiArg
      >({
        query: (queryArg) => ({ url: `/catalog/service/admin/${queryArg.id}` }),
        providesTags: ["Admin"],
      }),
      patchCatalogServiceAdminById: build.mutation<
        PatchCatalogServiceAdminByIdApiResponse,
        PatchCatalogServiceAdminByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/service/admin/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateService,
        }),
        invalidatesTags: ["Admin"],
      }),
      deleteCatalogServiceAdminById: build.mutation<
        DeleteCatalogServiceAdminByIdApiResponse,
        DeleteCatalogServiceAdminByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/catalog/service/admin/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Admin"],
      }),
      getCatalogService: build.query<
        GetCatalogServiceApiResponse,
        GetCatalogServiceApiArg
      >({
        query: () => ({ url: `/catalog/service` }),
        providesTags: ["User"],
      }),
      getCatalogServiceById: build.query<
        GetCatalogServiceByIdApiResponse,
        GetCatalogServiceByIdApiArg
      >({
        query: (queryArg) => ({ url: `/catalog/service/${queryArg.id}` }),
        providesTags: ["User"],
      }),
      getWalletByUser: build.query<
        GetWalletByUserApiResponse,
        GetWalletByUserApiArg
      >({
        query: () => ({ url: `/wallets` }),
        providesTags: ["Wallet"],
      }),
      getWalletByAdmin: build.query<
        GetWalletByAdminApiResponse,
        GetWalletByAdminApiArg
      >({
        query: (queryArg) => ({ url: `/wallets/users/${queryArg.userId}` }),
        providesTags: ["Wallet"],
      }),
      changeWalletStatusByAdmin: build.mutation<
        ChangeWalletStatusByAdminApiResponse,
        ChangeWalletStatusByAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/wallets/users/${queryArg.userId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["Wallet"],
      }),
      getAllWalletsByAdmin: build.query<
        GetAllWalletsByAdminApiResponse,
        GetAllWalletsByAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/wallets/users`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            status: queryArg.status,
            sort: queryArg.sort,
            sortBy: queryArg.sortBy,
          },
        }),
        providesTags: ["Wallet"],
      }),
      getUserTransactionByAdmin: build.query<
        GetUserTransactionByAdminApiResponse,
        GetUserTransactionByAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/users/${queryArg.userId}/${queryArg.id}`,
        }),
        providesTags: ["Transaction"],
      }),
      getUserTransactionsByAdmin: build.query<
        GetUserTransactionsByAdminApiResponse,
        GetUserTransactionsByAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/users/${queryArg.userId}`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            sort: queryArg.sort,
            sortBy: queryArg.sortBy,
            type: queryArg["type"],
            currency: queryArg.currency,
            walletId: queryArg.walletId,
            createdBy: queryArg.createdBy,
          },
        }),
        providesTags: ["Transaction"],
      }),
      getTransactionByAdmin: build.query<
        GetTransactionByAdminApiResponse,
        GetTransactionByAdminApiArg
      >({
        query: (queryArg) => ({ url: `/transactions/admin/${queryArg.id}` }),
        providesTags: ["Transaction"],
      }),
      getTransactionsByAdmin: build.query<
        GetTransactionsByAdminApiResponse,
        GetTransactionsByAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/admin`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            sort: queryArg.sort,
            sortBy: queryArg.sortBy,
            type: queryArg["type"],
            currency: queryArg.currency,
            walletId: queryArg.walletId,
            createdBy: queryArg.createdBy,
          },
        }),
        providesTags: ["Transaction"],
      }),
      getTransactionByUser: build.query<
        GetTransactionByUserApiResponse,
        GetTransactionByUserApiArg
      >({
        query: (queryArg) => ({ url: `/transactions/${queryArg.id}` }),
        providesTags: ["Transaction"],
      }),
      getTransactionsByUser: build.query<
        GetTransactionsByUserApiResponse,
        GetTransactionsByUserApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            sort: queryArg.sort,
            sortBy: queryArg.sortBy,
            type: queryArg["type"],
            currency: queryArg.currency,
            walletId: queryArg.walletId,
            createdBy: queryArg.createdBy,
          },
        }),
        providesTags: ["Transaction"],
      }),
      postTransactions: build.mutation<
        PostTransactionsApiResponse,
        PostTransactionsApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      postTransactionsSuperAdmin: build.mutation<
        PostTransactionsSuperAdminApiResponse,
        PostTransactionsSuperAdminApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/super-admin`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      createTicket: build.mutation<CreateTicketApiResponse, CreateTicketApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin`,
            method: "POST",
            body: queryArg.createTicket,
          }),
          invalidatesTags: ["admin"],
        }
      ),
      getAllTickets: build.query<GetAllTicketsApiResponse, GetAllTicketsApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin`,
            params: {
              page: queryArg.page,
              limit: queryArg.limit,
              sortBy: queryArg.sortBy,
              sortOrder: queryArg.sortOrder,
              status: queryArg.status,
            },
          }),
          providesTags: ["admin"],
        }
      ),
      getTicketById: build.query<GetTicketByIdApiResponse, GetTicketByIdApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin/${queryArg.id}`,
          }),
          providesTags: ["admin"],
        }
      ),
      updateTicket: build.mutation<UpdateTicketApiResponse, UpdateTicketApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin/${queryArg.id}`,
            method: "PUT",
            body: queryArg.updateTicket,
          }),
          invalidatesTags: ["admin"],
        }
      ),
      deleteTicket: build.mutation<DeleteTicketApiResponse, DeleteTicketApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["admin"],
        }
      ),
      sendMessageToChat: build.mutation<
        SendMessageToChatApiResponse,
        SendMessageToChatApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets/admin/${queryArg.id}/chat`,
          method: "POST",
          body: queryArg.sendMessageToChat,
        }),
        invalidatesTags: ["admin"],
      }),
      assignTicket: build.mutation<AssignTicketApiResponse, AssignTicketApiArg>(
        {
          query: (queryArg) => ({
            url: `/ticket-management/tickets/admin/${queryArg.id}/assign`,
            method: "PUT",
            body: queryArg.assignTicket,
          }),
          invalidatesTags: ["admin"],
        }
      ),
      assignTicketToSelf: build.mutation<
        AssignTicketToSelfApiResponse,
        AssignTicketToSelfApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets/admin/${queryArg.id}/assignToSelf`,
          method: "PUT",
        }),
        invalidatesTags: ["admin"],
      }),
      createTicketByUser: build.mutation<
        CreateTicketByUserApiResponse,
        CreateTicketByUserApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets`,
          method: "POST",
          body: queryArg.createTicketByUser,
        }),
        invalidatesTags: ["customer"],
      }),
      getAllTicketsByUser: build.query<
        GetAllTicketsByUserApiResponse,
        GetAllTicketsByUserApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            sortBy: queryArg.sortBy,
            sortOrder: queryArg.sortOrder,
            status: queryArg.status,
          },
        }),
        providesTags: ["customer"],
      }),
      getTicketByIdByUser: build.query<
        GetTicketByIdByUserApiResponse,
        GetTicketByIdByUserApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets/${queryArg.id}`,
        }),
        providesTags: ["customer"],
      }),
      sendMessageToChatByUser: build.mutation<
        SendMessageToChatByUserApiResponse,
        SendMessageToChatByUserApiArg
      >({
        query: (queryArg) => ({
          url: `/ticket-management/tickets/${queryArg.id}/chat`,
          method: "POST",
          body: queryArg.sendMessageToChatByUser,
        }),
        invalidatesTags: ["customer"],
      }),
      updatePurchase: build.mutation<
        UpdatePurchaseApiResponse,
        UpdatePurchaseApiArg
      >({
        query: (queryArg) => ({
          url: `/finance/purchases`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
      createPurchase: build.mutation<
        CreatePurchaseApiResponse,
        CreatePurchaseApiArg
      >({
        query: (queryArg) => ({
          url: `/finance/purchases`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as generatedApi };
export type PostUsersApiResponse = /** status 200 User created successfully */ {
  message?: string;
};
export type PostUsersApiArg = {
  body: {
    password?: string;
    username?: string;
  };
};
export type GetUsersApiResponse = /** status 200 A list of users */ {
  username?: string;
  email?: string;
  role?: string;
}[];
export type GetUsersApiArg = {
  page: number;
  limit: number;
};
export type GetUsersByIdApiResponse = /** status 200 User details */ {
  username?: string;
  email?: string;
  role?: string;
};
export type GetUsersByIdApiArg = {
  id: string;
};
export type DeleteUsersByIdApiResponse =
  /** status 200 User deleted successfully */ {
    data?: {
      username?: string;
      role?: string;
      active?: boolean;
      gender?: string;
      isEmailVerified?: boolean;
      isPhoneVerified?: boolean;
      id?: string;
      email?: string;
      lastName?: string;
      mobile?: string;
      name?: string;
      profileImage?: string | null;
    };
    meta?: {
      code?: string;
      message?: string;
      source?: string;
      version?: string;
      timestamp?: number;
      requestId?: string;
    };
  };
export type DeleteUsersByIdApiArg = {
  id: string;
};
export type PatchUsersByIdApiResponse =
  /** status 200 User updated successfully */ {
    message?: string;
  };
export type PatchUsersByIdApiArg = {
  id: string;
  body: {
    active?: boolean;
  };
};
export type PatchUsersPanelApiResponse =
  /** status 200 Profile updated successfully */ {
    message?: string;
  };
export type PatchUsersPanelApiArg = {
  body: {
    name?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    username?: string;
    gender?: string;
  };
};
export type DeleteUsersPanelApiResponse =
  /** status 200 Account terminated successfully */ {
    message?: string;
  };
export type DeleteUsersPanelApiArg = void;
export type PutUsersPanelImageApiResponse =
  /** status 200 Profile image updated successfully */ {
    message?: string;
  };
export type PutUsersPanelImageApiArg = {
  body: {
    image?: Blob;
  };
};
export type DeleteUsersPanelImageApiResponse =
  /** status 200 Profile image deleted successfully */ {
    message?: string;
  };
export type DeleteUsersPanelImageApiArg = void;
export type PostAuthLoginApiResponse = /** status 200 Login successful */ {
  token?: string;
};
export type PostAuthLoginApiArg = {
  body: {
    loginType?: string;
    identifier?: string;
    password?: string;
  };
};
export type PostAuthSignupApiResponse =
  /** status 200 Registration successful */ {
    message?: string;
  };
export type PostAuthSignupApiArg = {
  body: {
    identifierType?: string;
    identifier?: string;
    password?: string;
    confirmPassword?: string;
  };
};
export type PostAuthUsernameApiResponse =
  /** status 200 Registration successful */ {
    message?: string;
  };
export type PostAuthUsernameApiArg = {
  body: {
    username?: string;
  };
};
export type UpdateUserPasswordApiResponse =
  /** status 200 Password updated successfully */ {
    data?: {
      username?: string;
      role?: string;
      name?: string;
      lastName?: string;
      mobile?: string;
      idNumber?: string;
      address?: string;
      active?: boolean;
      email?: string;
      gender?: string;
      isEmailVerified?: boolean;
      isPhoneVerified?: boolean;
      country?: number;
      id?: string;
    };
    meta?: {
      code?: string;
      message?: string;
      source?: string;
      version?: string;
      timestamp?: number;
      requestId?: string;
    };
  };
export type UpdateUserPasswordApiArg = {
  authorization: string;
  body: {
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
  };
};
export type PostCatalogCategoryAdminApiResponse =
  /** status 200 Successfully created category */ Category;
export type PostCatalogCategoryAdminApiArg = {
  createCategory: CreateCategory;
};
export type GetCatalogCategoryAdminApiResponse =
  /** status 200 Successfully retrieved all categories */ Category[];
export type GetCatalogCategoryAdminApiArg = void;
export type GetCatalogCategoryAdminByIdApiResponse =
  /** status 200 Successfully retrieved category */ Category;
export type GetCatalogCategoryAdminByIdApiArg = {
  id: string;
};
export type PatchCatalogCategoryAdminByIdApiResponse =
  /** status 200 Successfully updated category */ Category;
export type PatchCatalogCategoryAdminByIdApiArg = {
  id: string;
  updateCategory: UpdateCategory;
};
export type DeleteCatalogCategoryAdminByIdApiResponse = unknown;
export type DeleteCatalogCategoryAdminByIdApiArg = {
  id: string;
};
export type GetCatalogCategoryApiResponse =
  /** status 200 Successfully retrieved all categories */ Category[];
export type GetCatalogCategoryApiArg = void;
export type GetCatalogCategoryByIdApiResponse =
  /** status 200 Successfully retrieved category */ Category;
export type GetCatalogCategoryByIdApiArg = {
  id: string;
};
export type PostCatalogServiceAdminApiResponse =
  /** status 200 Successfully created service */ Service;
export type PostCatalogServiceAdminApiArg = {
  createService: CreateService;
};
export type GetCatalogServiceAdminApiResponse =
  /** status 200 Successfully retrieved all services */ Service[];
export type GetCatalogServiceAdminApiArg = void;
export type GetCatalogServiceAdminByIdApiResponse =
  /** status 200 Successfully retrieved service */ Service;
export type GetCatalogServiceAdminByIdApiArg = {
  id: string;
};
export type PatchCatalogServiceAdminByIdApiResponse =
  /** status 200 Successfully updated service */ Service;
export type PatchCatalogServiceAdminByIdApiArg = {
  id: string;
  updateService: UpdateService;
};
export type DeleteCatalogServiceAdminByIdApiResponse = unknown;
export type DeleteCatalogServiceAdminByIdApiArg = {
  id: string;
};
export type GetCatalogServiceApiResponse =
  /** status 200 Successfully retrieved all services */ Service[];
export type GetCatalogServiceApiArg = void;
export type GetCatalogServiceByIdApiResponse =
  /** status 200 Successfully retrieved service */ Service;
export type GetCatalogServiceByIdApiArg = {
  id: string;
};
export type GetWalletByUserApiResponse =
  /** status 200 Successful operation */ Wallet;
export type GetWalletByUserApiArg = void;
export type GetWalletByAdminApiResponse =
  /** status 200 Successful operation */ Wallet;
export type GetWalletByAdminApiArg = {
  /** The ID of the user. */
  userId: string;
};
export type ChangeWalletStatusByAdminApiResponse =
  /** status 200 Successful operation */ Wallet;
export type ChangeWalletStatusByAdminApiArg = {
  /** The ID of the user. */
  userId: string;
  /** Wallet status change request */
  body: {
    status?: "active" | "inactive" | "suspended";
  };
};
export type GetAllWalletsByAdminApiResponse =
  /** status 200 Successful operation */ Wallet[];
export type GetAllWalletsByAdminApiArg = {
  /** Page number for pagination. */
  page?: string;
  /** Number of records per page. */
  limit?: string;
  /** Filter by wallet status. */
  status?: "active" | "inactive" | "suspended";
  /** Sort order (1 for ascending, -1 for descending). */
  sort?: "1" | "-1";
  /** Field to sort by. */
  sortBy?: "createdAt" | "userId" | "updatedAt" | "status";
};
export type GetUserTransactionByAdminApiResponse =
  /** status 200 Successful operation */ Transaction;
export type GetUserTransactionByAdminApiArg = {
  /** The ID of the user. */
  userId: string;
  /** The ID of the transaction. */
  id: string;
};
export type GetUserTransactionsByAdminApiResponse =
  /** status 200 Successful operation */ Transaction[];
export type GetUserTransactionsByAdminApiArg = {
  /** The ID of the user. */
  userId: string;
  /** Page number for pagination. */
  page?: string;
  /** Number of records per page. */
  limit?: string;
  /** Sort order (1 for ascending, -1 for descending). */
  sort?: "1" | "-1";
  /** Field to sort by. */
  sortBy?:
    | "createdAt"
    | "walletId"
    | "updatedAt"
    | "type"
    | "currency"
    | "createdBy"
    | "date"
    | "amount";
  /** Filter by transaction type. */
  type?:
    | "deposit"
    | "withdrawal"
    | "incoming-transfer"
    | "outgoing-transfer"
    | "purchase"
    | "unfreeze";
  /** Filter by currency. */
  currency?: "IRT" | "USD" | "EUR" | "GBP";
  /** Filter by wallet ID. */
  walletId?: string;
  /** Filter by creator ID. */
  createdBy?: string;
};
export type GetTransactionByAdminApiResponse =
  /** status 200 Successful operation */ Transaction;
export type GetTransactionByAdminApiArg = {
  /** The ID of the transaction. */
  id: string;
};
export type GetTransactionsByAdminApiResponse =
  /** status 200 Successful operation */ Transaction[];
export type GetTransactionsByAdminApiArg = {
  /** Page number for pagination. */
  page?: string;
  /** Number of records per page. */
  limit?: string;
  /** Sort order (1 for ascending, -1 for descending). */
  sort?: "1" | "-1";
  /** Field to sort by. */
  sortBy?:
    | "createdAt"
    | "walletId"
    | "updatedAt"
    | "type"
    | "currency"
    | "createdBy"
    | "date"
    | "amount";
  /** Filter by transaction type. */
  type?:
    | "deposit"
    | "withdrawal"
    | "incoming-transfer"
    | "outgoing-transfer"
    | "purchase"
    | "unfreeze";
  /** Filter by currency. */
  currency?: "IRT" | "USD" | "EUR" | "GBP";
  /** Filter by wallet ID. */
  walletId?: string;
  /** Filter by creator ID. */
  createdBy?: string;
};
export type GetTransactionByUserApiResponse =
  /** status 200 Successful operation */ Transaction;
export type GetTransactionByUserApiArg = {
  /** The ID of the transaction. */
  id: string;
};
export type GetTransactionsByUserApiResponse =
  /** status 200 Successful operation */ Transaction[];
export type GetTransactionsByUserApiArg = {
  /** Page number for pagination. */
  page?: string;
  /** Number of records per page. */
  limit?: string;
  /** Sort order (1 for ascending, -1 for descending). */
  sort?: "1" | "-1";
  /** Field to sort by. */
  sortBy?:
    | "createdAt"
    | "walletId"
    | "updatedAt"
    | "type"
    | "currency"
    | "createdBy"
    | "date"
    | "amount";
  /** Filter by transaction type. */
  type?:
    | "deposit"
    | "withdrawal"
    | "incoming-transfer"
    | "outgoing-transfer"
    | "purchase"
    | "unfreeze";
  /** Filter by currency. */
  currency?: "IRT" | "USD" | "EUR" | "GBP";
  /** Filter by wallet ID. */
  walletId?: string;
  /** Filter by creator ID. */
  createdBy?: string;
};
export type PostTransactionsApiResponse =
  /** status 200 Successful response */ {
    data?: {
      targetWallet?: string;
      targetUser?: string;
      outGoingTransaction?: {
        walletId?: string;
        type?: string;
        currency?: string;
        amount?: number;
        description?: string;
        createdBy?: string;
        date?: string;
        outgoingTransferDetails?: {
          toWalletId?: string;
        };
        _id?: string;
        createdAt?: string;
        updatedAt?: string;
        id?: string;
        __v?: number;
      };
      incomingTransaction?: string;
    };
    meta?: {
      code?: string;
      message?: string;
      source?: string;
      version?: string;
      timestamp?: number;
      requestId?: string;
    };
  };
export type PostTransactionsApiArg = {
  body: {
    amount?: number;
    currency?: string;
    targetUser?: string;
  };
};
export type PostTransactionsSuperAdminApiResponse =
  /** status 200 Successful response */ {
    data?: {
      walletId?: string;
      type?: string;
      currency?: string;
      amount?: number;
      description?: string;
      createdBy?: string;
      date?: string;
      depositDetails?: {
        bankName?: string;
        accountNumber?: string;
        depositBy?: string;
      };
      _id?: string;
      createdAt?: string;
      updatedAt?: string;
      id?: string;
      __v?: number;
    };
    meta?: {
      code?: string;
      message?: string;
      source?: string;
      version?: string;
      timestamp?: number;
      requestId?: string;
    };
  };
export type PostTransactionsSuperAdminApiArg = {
  body: {
    amount?: number;
    currency?: string;
    targetUser?: string;
    description?: string;
  };
};
export type CreateTicketApiResponse = unknown;
export type CreateTicketApiArg = {
  createTicket: CreateTicket;
};
export type GetAllTicketsApiResponse = unknown;
export type GetAllTicketsApiArg = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "-1" | "1";
  status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
};
export type GetTicketByIdApiResponse = unknown;
export type GetTicketByIdApiArg = {
  id: string;
};
export type UpdateTicketApiResponse = unknown;
export type UpdateTicketApiArg = {
  id: string;
  updateTicket: UpdateTicket;
};
export type DeleteTicketApiResponse = unknown;
export type DeleteTicketApiArg = {
  id: string;
};
export type SendMessageToChatApiResponse = unknown;
export type SendMessageToChatApiArg = {
  id: string;
  sendMessageToChat: SendMessageToChat;
};
export type AssignTicketApiResponse = unknown;
export type AssignTicketApiArg = {
  id: string;
  assignTicket: AssignTicket;
};
export type AssignTicketToSelfApiResponse = unknown;
export type AssignTicketToSelfApiArg = {
  id: string;
};
export type CreateTicketByUserApiResponse = unknown;
export type CreateTicketByUserApiArg = {
  createTicketByUser: CreateTicketByUser;
};
export type GetAllTicketsByUserApiResponse = unknown;
export type GetAllTicketsByUserApiArg = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "-1" | "1";
  status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
};
export type GetTicketByIdByUserApiResponse = unknown;
export type GetTicketByIdByUserApiArg = {
  id: string;
};
export type SendMessageToChatByUserApiResponse = unknown;
export type SendMessageToChatByUserApiArg = {
  id: string;
  sendMessageToChatByUser: SendMessageToChatByUser;
};
export type UpdatePurchaseApiResponse = unknown;
export type UpdatePurchaseApiArg = {
  body: {
    /** The ID of the purchase */
    purchaseId: string;
  };
};
export type CreatePurchaseApiResponse = unknown;
export type CreatePurchaseApiArg = {
  body: {
    /** The ID of the service */
    serviceId: string;
    /** Duration of the service */
    duration: number;
  };
};
export type Category = {
  id?: string;
  name?: {
    fa?: string;
    en?: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  services?: string[];
  description?: string;
  iconCode?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};
export type CreateCategory = {
  name: {
    fa?: string;
    en: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  services?: string[];
  description?: string;
  iconCode?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};
export type UpdateCategory = {
  name?: {
    fa?: string;
    en?: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  services?: string[];
  description?: string;
  iconCode?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};
export type Service = {
  id?: string;
  name?: {
    fa?: string;
    en?: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  description?: string;
  iconCode?: string;
  price?: {
    value?: number;
    currency?: "IRT" | "USD" | "EUR" | "GBP";
  };
  category?: string;
  discounts?: {
    months?: number;
    percentage?: number;
  }[];
  handleType?: "file" | "coupon" | "service";
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};
export type CreateService = {
  name: {
    fa?: string;
    en: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  description?: string;
  iconCode?: string;
  price: {
    value: number;
    currency: "IRT" | "USD" | "EUR" | "GBP";
  };
  category: string;
  discounts?: {
    months?: number;
    percentage?: number;
  }[];
  handleType: "file" | "coupon" | "service";
  isActive?: boolean;
  isDeleted?: boolean;
};
export type UpdateService = {
  name?: {
    fa?: string;
    en?: string;
    es?: string;
    pr?: string;
    ar?: string;
  };
  description?: string;
  iconCode?: string;
  price?: {
    value?: number;
    currency?: "IRT" | "USD" | "EUR" | "GBP";
  };
  category?: string;
  discounts?: {
    months?: number;
    percentage?: number;
  }[];
  handleType?: "TYPE1" | "TYPE2" | "TYPE3";
  isActive?: boolean;
  isDeleted?: boolean;
};
export type Wallet = {
  id?: string;
  userId?: string;
  balance?: number;
  status?: "active" | "inactive" | "suspended";
};
export type Error = {
  message?: string;
  code?: number;
};
export type Transaction = {
  id?: string;
  userId?: string;
  walletId?: string;
  type?:
    | "deposit"
    | "withdrawal"
    | "incoming-transfer"
    | "outgoing-transfer"
    | "purchase"
    | "unfreeze";
  amount?: number;
  currency?: "IRT" | "USD" | "EUR" | "GBP";
  date?: string;
};
export type CreateTicket = {
  title: string;
  description?: string;
  assignedTo?: string;
  customerId?: string;
};
export type UpdateTicket = {
  title?: string;
  description?: string;
  assignedTo?: string;
  status?: "OPEN" | "IN_PROGRESS" | "CLOSED";
};
export type SendMessageToChat = {
  message?: string;
};
export type AssignTicket = {
  assigneeId: string;
};
export type CreateTicketByUser = {
  title: string;
  description?: string;
};
export type SendMessageToChatByUser = {
  message?: string;
};

import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logOut, updateAccessToken } from "../slices/authSlice";

// Custom type for RootState containing auth
interface RootState {
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

// Interface Types
export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string | null;
  role: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  genre: string;
  language: string;
  words: number;
  pages: number;
  target_audience: string;
  description: string;
  keywords: string;
  manuscript_urls: string | null;
  cover_image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BookCreateInput {
  title: string;
  subtitle?: string;
  genre: string;
  language: string;
  words: number;
  pages?: number;
  target_audience: string;
  description: string;
  keywords?: string;
  manuscript_urls?: string;
  cover_image_url?: string;
}

export interface BookUpdateInput extends Partial<BookCreateInput> {
  id: number | string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface UnreadCountResponse {
  unread_count: number;
}

export interface PresignedUrlInput {
  file_name: string;
  content_type: string;
  folder?: string;
}

export interface PresignedUrlResponse {
  url: string;
  fields?: Record<string, string>;
  key?: string;
  presigned_url?: string;
  object_key?: string;
  public_url?: string;
}

export interface StorePackage {
  id: number;
  name: string;
  description: string;
  price: string;
  features?: string[];
}

export interface UserPackage {
  id: number;
  package_id: number;
  package_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CheckoutInput {
  package_id: number;
}

export interface LeadCaptureInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_message: string;
}

export interface ChatbotLeadCaptureInput {
  name: string;
  email: string;
}


const baseQuery = fetchBaseQuery({
  baseUrl: "https://outspoken-detract-semisoft.ngrok-free.dev",
  prepareHeaders: (headers, { getState }) => {
    // Bypass ngrok browser warning
    headers.set("ngrok-skip-browser-warning", "true");
    
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Automated Reauth flow for token refresh
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Token expired (401), attempting silent refresh...");
    // Try to get a new token
    const state = api.getState() as RootState;
    const refresh = state.auth.refreshToken;

    if (refresh) {
      const refreshResult = await baseQuery(
        {
          url: "/api/auth/token/refresh/",
          method: "POST",
          body: { refresh },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as { access: string; refresh?: string };
        console.log("Token refresh succeeded.");
        // Store new access token
        api.dispatch(updateAccessToken(data.access));
        // Retry original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Token refresh failed, logging out user...");
        api.dispatch(logOut());
      }
    } else {
      console.log("No refresh token found, logging out...");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Book", "Notification", "Package"],
  endpoints: (builder) => ({
    // Auth Endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/auth/register/",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/logout/",
        method: "POST",
        body: payload,
      }),
    }),
    googleLogin: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/google/",
        method: "POST",
        body: payload,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/verify-email/",
        method: "POST",
        body: payload,
      }),
    }),
    resendCode: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/resend-code/",
        method: "POST",
        body: payload,
      }),
    }),
    passwordResetRequest: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/password-reset/request/",
        method: "POST",
        body: payload,
      }),
    }),
    passwordResetVerify: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/password-reset/verify/",
        method: "POST",
        body: payload,
      }),
    }),
    passwordResetConfirm: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/password-reset/confirm/",
        method: "POST",
        body: payload,
      }),
    }),

    // Users / Profile Endpoints
    getProfile: builder.query<UserProfile, void>({
      query: () => "/api/users/profile/",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (profileData) => ({
        url: "/api/users/profile/update/",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Books Endpoints
    listBooks: builder.query<Book[], void>({
      query: () => "/api/books/list/",
      providesTags: ["Book"],
    }),
    getBook: builder.query<Book, number | string>({
      query: (id) => `/api/books/${id}/`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<Book, BookCreateInput>({
      query: (bookData) => ({
        url: "/api/books/create/",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, BookUpdateInput>({
      query: ({ id, ...bookData }) => ({
        url: `/api/books/${id}/update/`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: (result, error, { id }) => ["Book", { type: "Book", id }],
    }),

    // Core / Health & Upload Endpoints
    coreHealth: builder.query<void, void>({
      query: () => "/api/core/health/",
    }),
    getPresignedUrl: builder.mutation<PresignedUrlResponse, PresignedUrlInput>({
      query: (payload) => ({
        url: "/api/core/upload/presigned-url/",
        method: "POST",
        body: payload,
      }),
    }),

    // Notifications Endpoints
    listNotifications: builder.query<NotificationItem[], void>({
      query: () => "/api/notifications/",
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/api/notifications/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    readNotification: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/api/notifications/${id}/read/`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
    readAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: "/api/notifications/read-all/",
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => "/api/notifications/unread-count/",
      providesTags: ["Notification"],
    }),

    // Store / Packages Endpoints
    checkout: builder.mutation<void, CheckoutInput>({
      query: (payload) => ({
        url: "/api/store/user/checkout/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Package"],
    }),
    getMyPackage: builder.query<UserPackage, void>({
      query: () => "/api/store/user/my-package/",
      providesTags: ["Package"],
    }),
    listPackages: builder.query<StorePackage[], void>({
      query: () => "/api/store/user/packages/list-packages/",
    }),
    storeWebhook: builder.mutation<void, any>({
      query: (payload) => ({
        url: "/api/store/webhook/",
        method: "POST",
        body: payload,
      }),
    }),
    captureLead: builder.mutation<void, LeadCaptureInput>({
      query: (payload) => ({
        url: "/api/leads/capture/",
        method: "POST",
        body: payload,
      }),
    }),
    captureChatbotLead: builder.mutation<void, ChatbotLeadCaptureInput>({
      query: (payload) => ({
        url: "/api/leads/capture/chatbot/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  usePasswordResetRequestMutation,
  usePasswordResetVerifyMutation,
  usePasswordResetConfirmMutation,
  
  useGetProfileQuery,
  useUpdateProfileMutation,
  useListBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useCoreHealthQuery,
  useGetPresignedUrlMutation,
  useListNotificationsQuery,
  useDeleteNotificationMutation,
  useReadNotificationMutation,
  useReadAllNotificationsMutation,
  useGetUnreadCountQuery,
  useCheckoutMutation,
  useGetMyPackageQuery,
  useListPackagesQuery,
  useStoreWebhookMutation,
  useCaptureLeadMutation,
  useCaptureChatbotLeadMutation,
} = authApi;

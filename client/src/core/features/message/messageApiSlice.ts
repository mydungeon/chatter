import apiSlice from "../api/apiSlice";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: ({ roomID, senderID, message }: { roomID: string, message: string, senderID: string }) => ({
        url: `api/msg/${roomID}`,
        method: "POST",
        body: { roomID, senderID, message }
      })
    }),
    getRoomsMessage: builder.mutation<any, void>({
      query: () => ({
        url: `api/msg/`,
        method: "GET"
      })
    }),
    getRoomMessage: builder.mutation<any, void>({
      query: (roomID) => ({
        url: `api/msg/${roomID}`,
        method: "GET"
      })
    }),
    getMessage: builder.mutation<any, void>({
      query: (roomID) => ({
        url: `api/msg-update/${roomID}`,
        method: "GET"
      })
    })
  })
})

export const {
  useGetMessageMutation,
  useGetRoomsMessageMutation,
  useGetRoomMessageMutation,
  useSendMessageMutation
} = messageApiSlice
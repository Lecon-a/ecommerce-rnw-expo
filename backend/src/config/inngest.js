import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "spa-ecommerce-expo" })

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();
        const { id, email_address, first_name, last_name, image_url } = event.data
        
        const newUser = {
            clerkId: id,
            email: email_address[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            imageUrl: image_url,
            addresses: [],
            wishlist: [],
        };

        await User.create(newUser)
})

const deleteUserFormDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.delete" },

    async ({ event }) => {
        
        await connectDB();

        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
    }
);

export const functions = [syncUser, deleteUserFormDB]


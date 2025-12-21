import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "spa-ecommerce-expo" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();
        const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = event.data
        
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            imageUrl: image_url,
            addresses: [],
            wishlist: [],
            phone_numbers: "",
        };

        await User.create(newUser)
})

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "user.deleted" },
    async ({ event }) => {
        
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
    }
);

export const functions = [syncUser, deleteUserFromDB]

// {
//   "id": "user_sample_123",
//   "object": "user",
//   "first_name": "Maren",
//   "last_name": "Philips",
//   "name": "Maren Philips",
//   "has_image": true,
//   "image_url": "https://images.clerk.dev/static/sample-avatar.png",
//   "password_enabled": false,
//   "passkeys": [],
//   "two_factor_enabled": false,
//   "email_addresses": [],
//   "phone_numbers": [],
//   "web3_wallets": [],
//   "external_accounts": [
//     {
//       "id": "ext_123",
//       "object": "external_account",
//       "provider": "oauth_apple",
//       "identification_id": "idn_123",
//       "provider_user_id": "prov_123",
//       "approved_scopes": "email,profile",
//       "email_address": "maren.philips@example.com",
//       "first_name": "Maren",
//       "last_name": "Philips",
//       "avatar_url": "https://images.clerk.dev/static/sample-avatar.png",
//       "public_metadata": {},
//       "created_at": 1764615267425,
//       "updated_at": 1766343267425
//     }
//   ],
//   "enterprise_accounts": [],
//   "public_metadata": {
//     "role": "member",
//     "feature_flag": "sample_only"
//   },
//   "private_metadata": {
//     "internal_note": "This is a sample user constructed from settings"
//   },
//   "unsafe_metadata": {},
//   "last_sign_in_at": 1766336067425,
//   "last_active_at": 1766342367425,
//   "created_at": 1758567267425,
//   "updated_at": 1766343267425,
//   "banned": false,
//   "locked": false,
//   "lockout_expires_in_seconds": null,
//   "delete_self_enabled": true,
//   "bypass_client_trust": false,
//   "create_organization_enabled": true,
//   "create_organizations_limit": null,
//   "totp_enabled": false,
//   "backup_code_enabled": false,
//   "legal_accepted_at": null
// }
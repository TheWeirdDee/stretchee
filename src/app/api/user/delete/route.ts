import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const { userId } = await request.json();

        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
             return NextResponse.json({ error: "Missing SUPABASE_SERVICE_ROLE_KEY in environment variables. You must add this to .env.local to delete users." }, { status: 500 });
        }

        // Need the service role key to delete users securely from the admin API
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "User deleted successfully", data }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
    }
}

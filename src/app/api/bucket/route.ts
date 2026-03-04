import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: { autoRefreshToken: false, persistSession: false }
        }
    );

    const { data, error } = await supabaseAdmin.storage.createBucket('avatars', { 
        public: true, 
        fileSizeLimit: 2097152 
    });

    return NextResponse.json({ data, error });
}

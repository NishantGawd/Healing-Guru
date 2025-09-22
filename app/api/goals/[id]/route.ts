import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper function to initialize Supabase client
const getSupabaseClient = async () => {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name) => cookieStore.get(name)?.value,
            },
        }
    );
};

// PUT handler to update a goal's title
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseClient();
    const { id } = await params;
    const { title } = await request.json();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("client_goals")
        .update({ title })
        .eq("id", id)
        .eq("user_id", user.id) // Ensure users can only update their own goals
        .select();

    if (error) {
        console.error("Update Goal Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}

// DELETE handler to remove a goal
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = await getSupabaseClient();
    const { id } = await params;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
        .from("client_goals")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id); // Ensure users can only delete their own goals

    if (error) {
        console.error("Delete Goal Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Goal deleted successfully" });
}

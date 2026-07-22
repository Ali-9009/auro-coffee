import { supabase } from "../../lib/supabase";

export async function getAdminProfile() {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw new Error(userError.message);
    }

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from("admin_profiles")
        .select(`
            id,
            full_name,
            role,
            is_active,
            created_at
        `)
        .eq("id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
import { supabase } from "../../lib/supabase";

export async function adminLogin(email, password) {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function adminLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function getCurrentAdmin() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return user;
}
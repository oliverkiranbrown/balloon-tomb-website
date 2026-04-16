import { query } from "./db";

/**
 * Validates an admin session token against the database.
 * Returns true only if the token exists and has not expired.
 */
export async function validateAdminSession(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    try {
        const result = await query(
            "SELECT id FROM admin_sessions WHERE id = $1 AND expires_at > now()",
            [token]
        );
        return result.rows.length > 0;
    } catch {
        return false;
    }
}

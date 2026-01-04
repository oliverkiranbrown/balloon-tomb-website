import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { query } from '../app/lib/db';

async function main() {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await query(
        `
        INSERT INTO admins (id, username, password_hash)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        `,
        [randomUUID(), username, passwordHash]
    );

    console.log('Admin user provisioned')

}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
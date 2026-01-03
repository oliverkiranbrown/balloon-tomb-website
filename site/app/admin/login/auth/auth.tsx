import bcrypt from "bcryptjs";

export default async function validateCredentials(
    username: string,
    password: string
) {
    // Query server to access the true username and password
    const res = await fetch('/api/admin_auth', {method: 'GET'})

    if (res.ok) {
        const data = await res.json();
    }



    // Validate user inputs
    if (!username || !password) {
        throw new Error('Missing username or password');
    }
    // Hash user submitted password
    const passwordHash = await bcrypt.hash(password, 12);

    
    
    // Hash the password

}
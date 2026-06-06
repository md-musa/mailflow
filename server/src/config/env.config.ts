
export default () => ({
    port: parseInt(process.env.PORT as string),

    database: {
        url: process.env.DATABASE_URL as string,
    },

    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET as string,
        refreshSecret: process.env.JWT_REFRESH_SECRET as string,
        accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    },

    bcrypt: {
        secret: process.env.BCRYPT_SECRET as string,
        saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS as string)
    },

    brevo: {
        apiKey: process.env.BREVO_API_KEY as string,
        senderEmail: process.env.BREVO_SENDER_EMAIL as string,
    },
    redis: {
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string),
        password: process.env.REDIS_PASSWORD as string,
    }
});
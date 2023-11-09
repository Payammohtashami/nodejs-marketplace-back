module.exports = {
    MONGO_ID_REGEX: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: 'USER',
        ADMIN: 'ADMIN',
        WRITER: 'WRITER',
        TEACHER: 'TEACHER',
    }),
    PERMISSIONS: Object.freeze({
        SUPER_ADMIN: ['all'],
        USER: ['profile'],
        WRITER: ['blog', 'category', 'course', 'product'],
        TEACHER: ['blog', 'course', 'episode', 'chapter'],
    }),
    ACCESS_TOKEN_SECRET_KEY: '57A811F7509E584AE28778A29D6AA46213E467DF435F02FC25A560A559B809C5',
    REFRSH_TOKEN_SECRET_KEY: 'B8B779F2EDD497EB9A0A468CC75B552E314784EEF2E3F185324F726D945C21C4',
}
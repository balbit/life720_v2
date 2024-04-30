import crypto from 'crypto'

export const gen_id = () => {
    return `user-${crypto.randomBytes(4).toString('hex')}`;
}
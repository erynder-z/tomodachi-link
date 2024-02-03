import { EncryptStorage } from 'encrypt-storage';

/**
 * Asynchronous function to retrieve the encryption key from the environment.
 *
 * @async
 * @function
 * @returns {Promise<string | undefined>} A promise that resolves with the encryption key or undefined.
 */
const getEncryptionKey = async () => {
    return import.meta.env.VITE_STORAGE_ENCRYPTION_KEY;
};

/**
 * Asynchronous function to initialize an instance of EncryptStorage with the encryption key.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if the encryption key is not available.
 * @returns {Promise<EncryptStorage>} A promise that resolves with an instance of EncryptStorage.
 */
const initializeEncryptStorage = async () => {
    const encryptionKey = await getEncryptionKey();
    if (!encryptionKey) {
        throw new Error('Encryption key is not available.');
    }

    return new EncryptStorage(encryptionKey);
};

/**
 * Instance of EncryptStorage for performing encrypted storage operations.
 *
 * @type {Promise<EncryptStorage>}
 */
export const encryptStorage = await initializeEncryptStorage();

import { EncryptStorage } from 'encrypt-storage';

const VITE_STORAGE_ENCRYPTION_KEY = import.meta.env.VITE_STORAGE_ENCRYPTION_KEY;

export const encryptStorage = new EncryptStorage(VITE_STORAGE_ENCRYPTION_KEY);

import { useState, useEffect } from 'react';

/**
 * Custom hook for persistent state using localStorage
 * Data persists across navigation but clears on browser refresh
 * 
 * @param key - Unique key for localStorage
 * @param initialValue - Initial value if no saved data exists
 * @returns [value, setValue] - Same interface as useState
 */
export function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Get initial value from localStorage or use provided initialValue
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Save to localStorage whenever value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    }, [key, value]);

    return [value, setValue];
}

/**
 * Hook to clear all form data on page refresh
 * Use this in your App.tsx or main component
 */
export function useClearOnRefresh(keys: string[]) {
    useEffect(() => {
        const handleBeforeUnload = () => {
            keys.forEach(key => {
                localStorage.removeItem(key);
            });
        };

        // Clear on component mount (page refresh)
        // But not on navigation
        const isPageRefresh = !window.performance.getEntriesByType('navigation')[0] ||
            (window.performance.getEntriesByType('navigation')[0] as any).type === 'reload';

        if (isPageRefresh) {
            keys.forEach(key => {
                localStorage.removeItem(key);
            });
        }

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [keys]);
}

/**
 * Hook for persistent file uploads
 * Stores file metadata and base64 data
 */
export function usePersistentFile(key: string) {
    const [fileData, setFileData] = usePersistentState<{ name: string, preview: string } | null>(key, null);

    const saveFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setFileData({
                name: file.name,
                preview: base64,
            });
        };
        reader.readAsDataURL(file);
    };

    const clearFile = () => {
        setFileData(null);
    };

    return { fileData, saveFile, clearFile };
}

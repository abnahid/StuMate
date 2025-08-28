import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './use-local-storage';

export function useFocus() {
    const [sessions, setSessions] = useLocalStorage('focusSessions', []);

    const addFocusSession = (newSession) => {
        setSessions([...sessions, { ...newSession, id: uuidv4() }]);
    };

    return { sessions, addFocusSession };
}
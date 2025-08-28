
import { initialClasses } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './use-local-storage';

export function useSchedule() {
    const [classes, setClasses] = useLocalStorage('classes', initialClasses);

    const addClass = (newClass) => {
        setClasses([...classes, { ...newClass, id: uuidv4() }]);
    };

    const updateClass = (updatedClass) => {
        setClasses(
            classes.map((c) => (c.id === updatedClass.id ? updatedClass : c))
        );
    };

    const deleteClass = (id) => {
        setClasses(classes.filter((c) => c.id !== id));
    };

    return { classes, addClass, updateClass, deleteClass };
}

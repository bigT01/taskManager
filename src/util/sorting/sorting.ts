import {ITask} from "../../store/useStore";


export function Sorting(array: ITask[], sortType:'BY_DATE' | 'BY_PRIORITY' | 'BY_NAME'){
    let afterSort = array;

    if(sortType === 'BY_NAME'){
        afterSort = array.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();

            // Compare the title
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; // title are equal
        })
    }
    if(sortType === 'BY_PRIORITY'){
        afterSort = array.sort((a, b) => {
            const nameA = a.priority
            const nameB = b.priority

            // Compare the priority
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; // priority are equal
        })
    }
    if(sortType === 'BY_DATE'){
        afterSort = array.sort((a, b) => {
            const nameA = a.deadline
            const nameB = b.deadline

            // Compare the priority
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; // priority are equal
        })
    }


    return afterSort
}

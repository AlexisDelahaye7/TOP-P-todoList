/*checkLocalStorageAvailability*/
const checkLocalStorageAvailability = (function(){
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    if (storageAvailable('localStorage')){
        return console.log('-- localStorage available')
    }else{
        return console.log('-- localStorage non available')
    }
})()

const tasksList = [
    [
        'All Tasks',
        ['Task One', 'description', 'date', 'priority', 'status'],
        ['Task Two', 'description', 'date', 'priority', 'status']
    ],
    [
        'Custom project',
        ['Task One', 'description', 'date', 'priority', 'status'],
        ['Task Two', 'description', 'date', 'priority', 'status']
    ],
]


/*
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];


})
*/

export default tasksList
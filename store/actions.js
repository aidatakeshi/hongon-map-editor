export default {

    getLS({ state, commit }) {
        if (!localStorage) return false;
        console.log('%c LocalStorage: Getting Data', 'color: fuchsia;');
        //Numeric
        for (let attr of ['x', 'y', 'logzoom']){
            const value = localStorage.getItem(attr);
            if (value !== null && isFinite(value)){
                commit(attr, parseFloat(value));
            }
        }
        //"display" JSON
        const value = localStorage.getItem('display');
        try{
            const value_parsed = JSON.parse(value);
            let display = {};
            for (let attr in state.display){
                display[attr] = (value_parsed[attr] !== undefined)
                ? value_parsed[attr] : state.display[attr];
            }
            //display.hidden
            display.hidden = {};
            for (let attr in state.display.hidden){
                display.hidden[attr] = (value_parsed.hidden[attr] !== undefined)
                ? value_parsed.hidden[attr] : state.display.hidden[attr];
            }
            commit('display', display);
        }catch(error){}
    },

    setLSXYZoom({ state, commit }) {
        if (!localStorage) return false;
        console.log('%c LocalStorage: Saving x/y/zoom Data', 'color: fuchsia;');
        for (let attr of ['x', 'y', 'logzoom']){
            localStorage.setItem(attr, state[attr]);
        }
    },

    setLSDisplay({ state, commit }) {
        if (!localStorage) return false;
        console.log('%c LocalStorage: Saving display Data', 'color: fuchsia;');
        localStorage.setItem('display', JSON.stringify(state.display));
    },

}
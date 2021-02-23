import {produce} from'immer';
//import { result } from 'lodash';


const initialState = {};

export default function cartReducer(state = initialState, action) {

    console.log('action', action)


    switch (action.type) {

        case 'ADD_ITEM_TO_CART':{
            const{item, value} = action

            return{
                ...state,
                [item._id]:{
                    ...action.item,
                    quantity: value
                }
            }
        }

        case 'REMOVE_ITEM_TO_CART':{
            return produce(state, (draftState) =>{
                delete draftState[action.item._id]
            })
        }

        case 'UPDATE_QUANTITY':{

            return produce(state, (draftState) =>{
                const {item, key, value} = action;
                draftState[item._id][key]= value;
            })

        }

        case 'CLEAR_CART':{
            
            return produce(state, (draftState) =>{
                return draftState = initialState
            })

        }
        

        default:
            return state;
    }
}


export const getCartItemArray = state => Object.values(state);

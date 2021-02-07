import {produce} from 'immer';

const initialeState = {};


export default function cartReducer (state = initialeState, action){

    console.log(action)

    switch(action.type){
        case "ADD_ITEM_TO_CART":{
            return {
                ...state,
                [action.item._id]:{
                    ...action.item,
                    quantity: 1,
                }
            }
        }

        case " REMOVE_ITEM_TO_CART":{
            return produce(state, (draftState) =>{
                delete draftState[action.item.id]
            })
        }
        case " UPDATE_QUANTITY ":{
            return produce(state, (draftState) =>{
                const {item, key, value} = action;
                
                draftState[item.id][key]= value;
            })
        }
        case 'CLEAR_CART':{

            return produce(state, (draftState) =>{
                return draftState = initialeState
            })

        }
        

        default:
            return state;


    }

}



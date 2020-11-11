import {LOAD_AVATAR_IMAGE} from  '../Actions/AvatarActionType';

const initialState = {avatarSource : require("./../../Images/ic_tag_faces.png")};

export const loadAvatar = (state : any = initialState, action : any) =>{
	
	switch(action.type){
		case LOAD_AVATAR_IMAGE:{
			let nextState: any;
				nextState = {
					...state,
					avatarSource : action.value
				}
			
			return  nextState || state;
		}
		default : {
			return state;
		}
	}
}
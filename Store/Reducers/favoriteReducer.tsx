import {TOGGLE_FAVORITE} from  '../Actions/FavoritesFilmActionType'

const initialState = {favoritesFilm : []}

export const toggleFavorite = (state : any = initialState, action : any) =>{
	
	switch(action.type){
		case TOGGLE_FAVORITE:{
			let nextState: any;
			let foundFilm= state.favoritesFilm.find((film:any) => film.id === action.value.id);
			if(foundFilm !== undefined ){
				//Suppression du film				
				nextState = {
					...state,
					favoritesFilm :state.favoritesFilm.filter((film:any) => film.id !==action.value.id)}
			}else{
				//Ajout du film dans le favoris
				nextState = {
					...state, 
					favoritesFilm: [...state.favoritesFilm, action.value] } //retourner un tableau et non un objet pour la liste des favoris
			}
			return  nextState || state;
		}
		default : {;
			return state;
		}
	}
}
export const state = () => ({
	auth: false,
	userData: {}
 })
 
 export const mutations = {
	setAuth(state, auth) {
	  state.auth = auth
	},
	setUserData(state, userData) {
	  state.userData = userData
	}
 }
 
 export const actions = {
	setAuth({commit}, auth) {
	  commit('setAuth', auth)
	},
	setUserData({commit}, userData) {
	  commit('setUserData', userData)
	}
 }
 
 export const getters = {
	isAuthenticated: state => state.auth,
	userData: state => state.userData,
 }
 
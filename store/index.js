import axios from "axios"

export default{
	actions: {
		async nuxtServerInit ({ commit }, { req }) {
			const headers = req && req.headers
			// const UserData = await axios.get("http://localhost:3000/api/user/get-authorized", { headers })
			// commit('auth/setAuth', true)
			// commit('auth/setUserData', UserData.data)
			await axios.get("http://localhost:3000/api/user/get-authorized", { headers })
			.then(response => {
				commit('auth/setAuth', true)
				commit('auth/setUserData', response.data)
			})
			.catch(error => {
				
			})
		}
	 }
}
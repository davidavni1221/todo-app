// import { userService } from "../services/user.service.js"

export const userStore = {
    state: {
        user: {
            fullName: 'Mike Levi',
            prefs: {
                color: '#000000',
                bgColor: '#ffffff'
            },
            activities: [
                {
                    txt: 'Added a Todo',
                    at: 1523873242735
                }]
        }
    },
    getters: {
        user({ user }) { return user }
    },
    mutations: {
        saveUser(state, { user }) {
            state.user = JSON.parse(JSON.stringify(user))
        },
        addActivity(state, { activity }) {
            state.user.activities.unshift(activity)
        },
    },
    actions: {
    }
}
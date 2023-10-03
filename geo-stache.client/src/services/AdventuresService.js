import { AppState } from "../AppState.js"
import { Adventure } from "../models/Adventure.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdventuresService {

    async addAdventure(adventureData) {
        const response = await api.post('api/adventures', adventureData)
        logger.log('new adventure!', response.data)
        const newAdventure = new Adventure(response.data)

        AppState.activeStacheAdventures.push(newAdventure)
        AppState.myAdventures.push(newAdventure)
    }

    async getAdventuresByStacheId(stacheId) {
        const response = await api(`api/staches/${stacheId}/adventures`)
        logger.log('getting those adventures by Stache', response.data)
        AppState.activeStacheAdventures = response.data

    }
    async deleteAdventure(adventureId) {
        const response = await api.delete(`api/adventures/${adventureId}`)
        logger.log('[DELETING ADVENTURE]', response.data)
        AppState.myAdventures = AppState.myAdventures.filter(a => a.id != adventureId)

    }


    // async completeAdventure(stacheId) {
    //     let completedAdventure = AppState.adventures.find(a => a.id == stacheId)

    //     const response = await api.put(`api/adventures/${adventureId}`)
    //     logger.log(response.data)

    // }


    // TODO find adventure in app state
    // TODO change adventure.status = 'completed'
    // TODO change adventure.foundDate = Date.now()
    // TODO send put request ('api/adventures/adventureId, foundadventure)
    // TODO  do a splice to get reactive change to see that flip on the page
}
export const adventuresService = new AdventuresService()
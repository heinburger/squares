import {useStrict, observable, action} from 'mobx'

useStrict(true)
class MenuStore {
  @observable paused = false

  @action togglePause = () => { this.paused = !this.paused }
  @action pauseGame = () => { this.paused = true }
  @action unPauseGame = () => { this.paused = false }
}

const menuStore = new MenuStore()
export default menuStore

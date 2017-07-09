import {useStrict, observable} from 'mobx'

useStrict(true)
class Store {
  @observable something = 'chyeah'
}

const store = new Store()
export default store

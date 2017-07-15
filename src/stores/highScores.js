import {observable, action, useStrict} from 'mobx'
import {get, post} from 'axios'

const BASE_URL = process.env.BASE_URL
  ? process.env.BASE_URL
  : 'http://localhost:3030/'

useStrict(true)
class HighScoreStore {
  scores = observable.shallowArray()
  @observable requesting = false
  @observable receivedOnce = false
  @observable error = null

  @action request = () => {
    this.error = null
    this.requesting = true
  }

  @action success = (scores) => {
    this.receivedOnce = true
    this.requesting = false
    this.scores.replace(scores)
  }

  @action failure = (err) => {
    this.requesting = false
    this.error = err || 'something happened..'
  }

  @action getScores = () => {
    this.request()
    get(BASE_URL + 'scores', {params: {limit: 10}})
      .then((resp) => this.success(resp.data))
      .catch((err) => this.failure(err))
  }

  @action postScore = (data) => {
    post(BASE_URL + 'submit', data)
  }
}

const highScoreStore = new HighScoreStore()
export default highScoreStore

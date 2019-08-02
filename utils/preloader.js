import { each } from 'lodash'

export default images => {
  each(images, src => {
    const image = new Image()
    image.src = src
  })
}

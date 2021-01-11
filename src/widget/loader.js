import setupLoader from './loader/setupLoader'

const exec = () => {
  if (!window.widget || !window.widget.loader) {
    setupLoader()
  }
}

exec()

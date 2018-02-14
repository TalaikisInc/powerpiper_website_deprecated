import ReactGA from 'react-ga'

import ENV from '../../conf'

export const initGA = () => {
  ReactGA.initialize(ENV.GA)
}

export const logPageView = (documentPath) => {
  if (documentPath) {
    ReactGA.set({ page: documentPath })
    ReactGA.pageview(documentPath)
  }
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}

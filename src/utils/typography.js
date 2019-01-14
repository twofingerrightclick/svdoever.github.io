import Typography from 'typography'
import GithubTypography from 'typography-theme-github'

GithubTypography.overrideThemeStyles = () => ({
  a: {
    color: '#0',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'a.anchor': {
    boxShadow: 'none',
  },
  'p code': {
    fontSize: '1.1rem'
  },
  'li code': {
    fontSize: '1rem'
  },
})

delete GithubTypography.googleFonts

const typography = new Typography(GithubTypography)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpg',
      light: '/avatar.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} • Doctor Nyte . All rights reserved.`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://go.nuxt.com/discord',
      'target': '_blank',
      'aria-label': 'Nuxt on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/docnyte',
      'target': '_blank',
      'aria-label': 'Doctor Nyte on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/docnyte',
      'target': '_blank',
      'aria-label': 'Doctor Nyte on GitHub'
    }]
  }
})

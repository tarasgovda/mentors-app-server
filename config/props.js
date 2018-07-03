//const props = require('/config/props')

const props = {
  prod: {
    name: 'production',
    db: {
      url: `mongodb://root:mentorsapppass1@ds247410.mlab.com:47410/mentorsapp`
    },
    session: {
      secret: 'mentorsappsecret'
    }
  },
  dev: {
    name: 'dev',
    db: {
      url: `mongodb://root:mentorsapppass1@ds247410.mlab.com:47410/mentorsapp`
    },
    session: {
      secret: 'mentorsappsecret'
    }
  }
}


module.exports =  props[process.env.NODE_ENV] || props.dev;

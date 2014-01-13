module.exports = {
  name : "somebot",
  channels : [
    "#bobot"
  ],
  server : "irc.freenode.net",
  flood: {
    "protection": true,
    "delay": 500
  },
  listeners : [
    "sayhi"
  ]
}

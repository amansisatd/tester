const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os

const status = async (req, res) => {
  const cpuUsage = await cpu.usage()
  const memUsage = await mem.info()

  const data = {
    cpuUsage: cpuUsage,
    memUsage: memUsage,
  }

  res.json(data)
}

module.exports = status

const vimeoId = url => {
  const match = /vimeo.*\/(\d+)/i.exec(url)

  if (match) {
    return match[1]
  }
}

export default vimeoId;

class Place {
  constructor(title, imageUri, address, location) {
    this.title = title
    this.imageUri = imageUri
    this.location = location
    this.address = address
    this.id = new Data().toString() + Math.random().toString()
  }
}
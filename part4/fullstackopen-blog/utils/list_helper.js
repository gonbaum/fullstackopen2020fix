const _ = require('lodash');

const mostBlogs = (listOfBlogs) => {
  if (listOfBlogs.length > 0) {
    // Lodash: Get an object with the count of property author in listOfBlog array
    const Authors = _.countBy(listOfBlogs, 'author')
    // Lodash: Create a chain of methods applied to the object Authors
    // First map the object to obtain an array
    // Then sort the array by Blogs count, get the values and pop the last element which is the bigger count
    const moreProlific = _.chain(Authors).
      map(function(blogs, author) {
        return {
          author: author,
          blogs: blogs
        }
      }).sortBy('Blogs')
      .value()
      .pop()
      return moreProlific
  } return undefined
}

const mostLikes = (listOfBlogs) => {
  if (listOfBlogs.length > 0) {
  const favorite =
    _(listOfBlogs)
    .groupBy('author')
    .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
    .sortBy('likes')
    .value()
    .pop()
      return favorite
  } return undefined
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  const sum = listOfBlogs.reduce((prev, cur) => prev + cur.likes, 0)
  return sum
}

const favoriteBlog = (listOfBlogs) => {
  if (listOfBlogs.length > 0) {
    let favorite = listOfBlogs.reduce((prev, cur) => cur.likes > prev.likes ? cur : prev)
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
      } 
  } return undefined  
}

module.exports = {
  totalLikes,
  mostLikes,
  dummy,
  favoriteBlog,
  mostBlogs
}